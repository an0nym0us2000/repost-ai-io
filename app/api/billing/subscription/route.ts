/**
 * Subscription API
 * GET /api/billing/subscription - Get current subscription
 * DELETE /api/billing/subscription - Cancel subscription
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/middleware/auth';
import { formatErrorResponse, ValidationError } from '@/lib/errors';
import { cancelSubscription, hasActiveSubscription } from '@/lib/stripe';
import { cancelPayPalSubscription, hasActivePayPalSubscription } from '@/lib/paypal';

/**
 * GET /api/billing/subscription
 */
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        plan: true,
        paymentProvider: true,
        stripeSubscriptionId: true,
        stripePriceId: true,
        stripeCurrentPeriodEnd: true,
        paypalSubscriptionId: true,
        paypalPlanId: true,
        paypalCurrentPeriodEnd: true,
      },
    });

    if (!dbUser) {
      throw new Error('User not found');
    }

    // Check active subscription based on payment provider
    const active = dbUser.paymentProvider === 'PAYPAL'
      ? await hasActivePayPalSubscription(user.id)
      : await hasActiveSubscription(user.id);

    // Return appropriate data based on payment provider
    if (dbUser.paymentProvider === 'PAYPAL') {
      return NextResponse.json({
        plan: dbUser.plan,
        provider: 'PAYPAL',
        subscriptionId: dbUser.paypalSubscriptionId,
        planId: dbUser.paypalPlanId,
        currentPeriodEnd: dbUser.paypalCurrentPeriodEnd,
        isActive: active,
      });
    }

    return NextResponse.json({
      plan: dbUser.plan,
      provider: 'STRIPE',
      subscriptionId: dbUser.stripeSubscriptionId,
      priceId: dbUser.stripePriceId,
      currentPeriodEnd: dbUser.stripeCurrentPeriodEnd,
      isActive: active,
    });
  } catch (error) {
    const errorResponse = formatErrorResponse(error as Error);
    return NextResponse.json(errorResponse, {
      status: errorResponse.error.statusCode,
    });
  }
}

/**
 * DELETE /api/billing/subscription - Cancel subscription
 */
export async function DELETE(req: NextRequest) {
  try {
    const user = await requireAuth();

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        paymentProvider: true,
        stripeSubscriptionId: true,
        paypalSubscriptionId: true,
      },
    });

    if (!dbUser) {
      throw new ValidationError('User not found');
    }

    // Handle PayPal cancellation
    if (dbUser.paymentProvider === 'PAYPAL') {
      if (!dbUser.paypalSubscriptionId) {
        throw new ValidationError('No active PayPal subscription found');
      }

      await cancelPayPalSubscription(dbUser.paypalSubscriptionId);

      return NextResponse.json({
        success: true,
        provider: 'PAYPAL',
        message: 'PayPal subscription cancelled successfully',
      });
    }

    // Handle Stripe cancellation
    if (!dbUser.stripeSubscriptionId) {
      throw new ValidationError('No active subscription found');
    }

    const subscription = await cancelSubscription(dbUser.stripeSubscriptionId);
    const sub = subscription as any;

    return NextResponse.json({
      success: true,
      provider: 'STRIPE',
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      currentPeriodEnd: sub.current_period_end,
    });
  } catch (error) {
    const errorResponse = formatErrorResponse(error as Error);
    return NextResponse.json(errorResponse, {
      status: errorResponse.error.statusCode,
    });
  }
}
