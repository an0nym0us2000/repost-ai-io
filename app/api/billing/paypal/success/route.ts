/**
 * PayPal Success Callback
 * GET /api/billing/paypal/success - Handle successful PayPal subscription
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPayPalSubscription, getPlanFromPayPalPlanId } from '@/lib/paypal';
import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import { nanoid } from 'nanoid';
import { SubscriptionStatus } from '@prisma/client';

/**
 * GET /api/billing/paypal/success
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const subscriptionId = searchParams.get('subscription_id');
    const token = searchParams.get('token');

    if (!subscriptionId) {
      return NextResponse.redirect(
        new URL('/settings?checkout=error&message=Missing+subscription+ID', req.url)
      );
    }

    // Get subscription details from PayPal
    const subscription = await getPayPalSubscription(subscriptionId);
    const subData = subscription.result;

    if (!subData) {
      return NextResponse.redirect(
        new URL('/settings?checkout=error&message=Subscription+not+found', req.url)
      );
    }

    // Get userId from customId
    const userId = subData.customId;
    if (!userId) {
      logger.error('No userId found in PayPal subscription customId');
      return NextResponse.redirect(
        new URL('/settings?checkout=error&message=Invalid+subscription', req.url)
      );
    }

    const planId = subData.planId;
    const plan = getPlanFromPayPalPlanId(planId);

    // Update user with PayPal subscription
    await prisma.user.update({
      where: { id: userId },
      data: {
        paypalSubscriptionId: subscriptionId,
        paypalPlanId: planId,
        paypalCurrentPeriodEnd: subData.billingInfo?.nextBillingTime
          ? new Date(subData.billingInfo.nextBillingTime)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
        paymentProvider: 'PAYPAL',
        plan,
      },
    });

    // Create subscription record
    await prisma.subscription.create({
      data: {
        id: nanoid(),
        userId,
        paymentProvider: 'PAYPAL',
        paypalSubscriptionId: subscriptionId,
        paypalPlanId: planId,
        paypalCustomerId: subData.subscriber?.payerId || '',
        status: subData.status === 'ACTIVE' ? SubscriptionStatus.ACTIVE : SubscriptionStatus.INCOMPLETE,
        currentPeriodStart: new Date(),
        currentPeriodEnd: subData.billingInfo?.nextBillingTime
          ? new Date(subData.billingInfo.nextBillingTime)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        cancelAtPeriodEnd: false,
        plan,
        updatedAt: new Date(),
      },
    });

    logger.info('PayPal subscription activated', { userId, subscriptionId });

    return NextResponse.redirect(new URL('/settings?checkout=success', req.url));
  } catch (error) {
    logger.error('PayPal success callback failed', error as Error);
    return NextResponse.redirect(
      new URL('/settings?checkout=error&message=Processing+failed', req.url)
    );
  }
}
