/**
 * PayPal Checkout API
 * POST /api/billing/paypal/checkout - Create PayPal subscription
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/middleware/auth';
import { formatErrorResponse } from '@/lib/errors';
import { createPayPalSubscription } from '@/lib/paypal';

const checkoutSchema = z.object({
  planId: z.string(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

/**
 * POST /api/billing/paypal/checkout
 */
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const data = checkoutSchema.parse(body);

    const appUrl = process.env.APP_URL || 'http://localhost:3000';

    const subscription = await createPayPalSubscription({
      userId: user.id,
      planId: data.planId,
      returnUrl: data.successUrl || `${appUrl}/api/billing/paypal/success`,
      cancelUrl: data.cancelUrl || `${appUrl}/pricing?checkout=cancelled`,
    });

    // Extract approval URL from subscription links
    const approvalUrl = subscription.result?.links?.find(
      (link: any) => link.rel === 'approve'
    )?.href;

    if (!approvalUrl) {
      throw new Error('No approval URL found in PayPal response');
    }

    return NextResponse.json({
      url: approvalUrl,
      subscriptionId: subscription.result?.id,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            message: error.issues[0].message,
            code: 'VALIDATION_ERROR',
            statusCode: 400,
          },
        },
        { status: 400 }
      );
    }

    const errorResponse = formatErrorResponse(error);
    return NextResponse.json(errorResponse, {
      status: errorResponse.error.statusCode,
    });
  }
}
