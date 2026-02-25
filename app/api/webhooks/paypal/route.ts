/**
 * PayPal Webhooks
 * POST /api/webhooks/paypal - Handle PayPal events
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { nanoid } from 'nanoid';
import { verifyPayPalWebhook, getPlanFromPayPalPlanId } from '@/lib/paypal';
import prisma from '@/lib/prisma';
import logger from '@/lib/logger';
import { SubscriptionStatus } from '@prisma/client';

/**
 * POST /api/webhooks/paypal
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();

  // Get PayPal webhook headers
  const webhookHeaders = {
    'paypal-auth-algo': headersList.get('paypal-auth-algo') || '',
    'paypal-cert-url': headersList.get('paypal-cert-url') || '',
    'paypal-transmission-id': headersList.get('paypal-transmission-id') || '',
    'paypal-transmission-sig': headersList.get('paypal-transmission-sig') || '',
    'paypal-transmission-time': headersList.get('paypal-transmission-time') || '',
  };

  // Verify webhook signature
  const webhookId = process.env.PAYPAL_WEBHOOK_ID || '';

  if (webhookId) {
    const isValid = await verifyPayPalWebhook({
      webhookId,
      headers: webhookHeaders,
      body,
    });

    if (!isValid) {
      logger.error('PayPal webhook signature verification failed');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 400 }
      );
    }
  }

  let event: any;

  try {
    event = JSON.parse(body);
  } catch (error: any) {
    logger.error('Failed to parse PayPal webhook body', error);
    return NextResponse.json(
      { error: 'Invalid webhook payload' },
      { status: 400 }
    );
  }

  try {
    switch (event.event_type) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        await handleSubscriptionActivated(event);
        break;

      case 'BILLING.SUBSCRIPTION.UPDATED':
        await handleSubscriptionUpdated(event);
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        await handleSubscriptionCancelled(event);
        break;

      case 'BILLING.SUBSCRIPTION.SUSPENDED':
        await handleSubscriptionSuspended(event);
        break;

      case 'BILLING.SUBSCRIPTION.EXPIRED':
        await handleSubscriptionExpired(event);
        break;

      case 'PAYMENT.SALE.COMPLETED':
        await handlePaymentCompleted(event);
        break;

      case 'PAYMENT.SALE.REFUNDED':
        await handlePaymentRefunded(event);
        break;

      default:
        logger.info('Unhandled PayPal webhook event type', { type: event.event_type });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('PayPal webhook handler failed', error as Error, {
      eventType: event.event_type,
    });
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle subscription activated
 */
async function handleSubscriptionActivated(event: any) {
  const resource = event.resource;
  const subscriptionId = resource.id;
  const userId = resource.custom_id;

  if (!userId) {
    logger.warn('No userId in PayPal subscription', { subscriptionId });
    return;
  }

  const planId = resource.plan_id;
  const plan = getPlanFromPayPalPlanId(planId);

  await updateUserSubscription(userId, resource, 'ACTIVE');
  logger.info('PayPal subscription activated', { userId, subscriptionId });
}

/**
 * Handle subscription updated
 */
async function handleSubscriptionUpdated(event: any) {
  const resource = event.resource;
  const subscriptionId = resource.id;

  const user = await prisma.user.findUnique({
    where: { paypalSubscriptionId: subscriptionId },
  });

  if (!user) {
    logger.warn('No user found for PayPal subscription', { subscriptionId });
    return;
  }

  const statusMap: Record<string, SubscriptionStatus> = {
    ACTIVE: SubscriptionStatus.ACTIVE,
    CANCELLED: SubscriptionStatus.CANCELED,
    SUSPENDED: SubscriptionStatus.PAST_DUE,
    EXPIRED: SubscriptionStatus.CANCELED,
  };

  const status = statusMap[resource.status] || SubscriptionStatus.ACTIVE;
  await updateUserSubscription(user.id, resource, status);

  logger.info('PayPal subscription updated', { userId: user.id, subscriptionId });
}

/**
 * Handle subscription cancelled
 */
async function handleSubscriptionCancelled(event: any) {
  const resource = event.resource;
  const subscriptionId = resource.id;

  const user = await prisma.user.findUnique({
    where: { paypalSubscriptionId: subscriptionId },
  });

  if (!user) {
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      plan: 'FREE',
      paypalSubscriptionId: null,
      paypalPlanId: null,
    },
  });

  await prisma.subscription.updateMany({
    where: {
      userId: user.id,
      paypalSubscriptionId: subscriptionId,
    },
    data: {
      status: SubscriptionStatus.CANCELED,
      canceledAt: new Date(),
    },
  });

  logger.info('PayPal subscription cancelled', { userId: user.id, subscriptionId });
}

/**
 * Handle subscription suspended
 */
async function handleSubscriptionSuspended(event: any) {
  const resource = event.resource;
  const subscriptionId = resource.id;

  const user = await prisma.user.findUnique({
    where: { paypalSubscriptionId: subscriptionId },
  });

  if (!user) {
    return;
  }

  await prisma.subscription.updateMany({
    where: {
      userId: user.id,
      paypalSubscriptionId: subscriptionId,
    },
    data: {
      status: SubscriptionStatus.PAST_DUE,
    },
  });

  logger.warn('PayPal subscription suspended', { userId: user.id, subscriptionId });
}

/**
 * Handle subscription expired
 */
async function handleSubscriptionExpired(event: any) {
  await handleSubscriptionCancelled(event);
}

/**
 * Handle payment completed
 */
async function handlePaymentCompleted(event: any) {
  const resource = event.resource;
  const billingAgreementId = resource.billing_agreement_id;

  if (!billingAgreementId) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: { paypalSubscriptionId: billingAgreementId },
  });

  if (!user) {
    return;
  }

  logger.info('PayPal payment completed', { userId: user.id });
}

/**
 * Handle payment refunded
 */
async function handlePaymentRefunded(event: any) {
  const resource = event.resource;
  logger.info('PayPal payment refunded', { saleId: resource.id });
}

/**
 * Update user subscription in database
 */
async function updateUserSubscription(
  userId: string,
  resource: any,
  status: SubscriptionStatus | string
) {
  const subscriptionId = resource.id;
  const planId = resource.plan_id;
  const plan = getPlanFromPayPalPlanId(planId);

  const statusMap: Record<string, SubscriptionStatus> = {
    ACTIVE: SubscriptionStatus.ACTIVE,
    CANCELLED: SubscriptionStatus.CANCELED,
    SUSPENDED: SubscriptionStatus.PAST_DUE,
    EXPIRED: SubscriptionStatus.CANCELED,
    APPROVAL_PENDING: SubscriptionStatus.INCOMPLETE,
  };

  const subscriptionStatus =
    typeof status === 'string' && status in statusMap
      ? statusMap[status]
      : (status as SubscriptionStatus);

  // Calculate next billing time
  const nextBillingTime = resource.billing_info?.next_billing_time
    ? new Date(resource.billing_info.next_billing_time)
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  // Update user
  await prisma.user.update({
    where: { id: userId },
    data: {
      paypalSubscriptionId: subscriptionId,
      paypalPlanId: planId,
      paypalCurrentPeriodEnd: nextBillingTime,
      paymentProvider: 'PAYPAL',
      plan,
    },
  });

  // Upsert subscription record
  await prisma.subscription.upsert({
    where: {
      paypalSubscriptionId: subscriptionId,
    },
    create: {
      id: nanoid(),
      userId,
      paymentProvider: 'PAYPAL',
      paypalSubscriptionId: subscriptionId,
      paypalPlanId: planId,
      paypalCustomerId: resource.subscriber?.payer_id || '',
      status: subscriptionStatus,
      currentPeriodStart: new Date(),
      currentPeriodEnd: nextBillingTime,
      cancelAtPeriodEnd: false,
      plan,
      updatedAt: new Date(),
    },
    update: {
      status: subscriptionStatus,
      currentPeriodEnd: nextBillingTime,
      cancelAtPeriodEnd: resource.status === 'CANCELLED',
      canceledAt: resource.status === 'CANCELLED' ? new Date() : null,
      plan,
      updatedAt: new Date(),
    },
  });
}
