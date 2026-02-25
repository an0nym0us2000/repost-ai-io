/**
 * PayPal Subscription Management API
 * GET /api/billing/paypal/subscription - Get current PayPal subscription
 * DELETE /api/billing/paypal/subscription - Cancel PayPal subscription
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/middleware/auth';
import { formatErrorResponse, ValidationError } from '@/lib/errors';
import {
  cancelPayPalSubscription,
  hasActivePayPalSubscription,
  getPayPalSubscription
} from '@/lib/paypal';

/**
 * GET /api/billing/paypal/subscription
 */
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        plan: true,
        paypalSubscriptionId: true,
        paypalPlanId: true,
        paypalCurrentPeriodEnd: true,
        paymentProvider: true,
      },
    });

    if (!dbUser) {
      throw new Error('User not found');
    }

    const active = await hasActivePayPalSubscription(user.id);

    return NextResponse.json({
      plan: dbUser.plan,
      subscriptionId: dbUser.paypalSubscriptionId,
      planId: dbUser.paypalPlanId,
      currentPeriodEnd: dbUser.paypalCurrentPeriodEnd,
      isActive: active,
      provider: 'PAYPAL',
    });
  } catch (error) {
    const errorResponse = formatErrorResponse(error as Error);
    return NextResponse.json(errorResponse, {
      status: errorResponse.error.statusCode,
    });
  }
}

/**
 * DELETE /api/billing/paypal/subscription - Cancel PayPal subscription
 */
export async function DELETE(req: NextRequest) {
  try {
    const user = await requireAuth();

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        paypalSubscriptionId: true,
        paymentProvider: true,
      },
    });

    if (!dbUser?.paypalSubscriptionId || dbUser.paymentProvider !== 'PAYPAL') {
      throw new ValidationError('No active PayPal subscription found');
    }

    await cancelPayPalSubscription(dbUser.paypalSubscriptionId);

    // Get updated subscription to verify cancellation
    const subscription = await getPayPalSubscription(dbUser.paypalSubscriptionId);
    const subData = subscription.result;

    return NextResponse.json({
      success: true,
      status: subData?.status,
      message: 'Subscription cancelled successfully',
    });
  } catch (error) {
    const errorResponse = formatErrorResponse(error as Error);
    return NextResponse.json(errorResponse, {
      status: errorResponse.error.statusCode,
    });
  }
}
