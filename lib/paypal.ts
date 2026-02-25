/**
 * PayPal Integration
 * Handles subscriptions and billing via PayPal
 */

import {
  Client,
  Environment,
  LogLevel,
  SubscriptionsController,
  ExperienceContextShippingPreference,
  ApplicationContextUserAction,
} from '@paypal/paypal-server-sdk';
import { Plan } from '@prisma/client';
import prisma from './prisma';
import logger, { loggers } from './logger';

let paypalClient: Client | null = null;
let subscriptionsController: SubscriptionsController | null = null;

export function getPayPal(): Client {
  if (!paypalClient) {
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      throw new Error('PayPal credentials are not configured');
    }

    paypalClient = new Client({
      clientCredentialsAuthCredentials: {
        oAuthClientId: process.env.PAYPAL_CLIENT_ID,
        oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET,
      },
      environment: process.env.PAYPAL_MODE === 'live' ? Environment.Production : Environment.Sandbox,
      logging: {
        logLevel: process.env.NODE_ENV === 'production' ? LogLevel.Error : LogLevel.Info,
        logRequest: { logBody: true },
        logResponse: { logHeaders: true },
      },
    });
  }
  return paypalClient;
}

export function getSubscriptionsController(): SubscriptionsController {
  if (!subscriptionsController) {
    subscriptionsController = new SubscriptionsController(getPayPal());
  }
  return subscriptionsController;
}

/**
 * PayPal Plan IDs mapping
 */
export const PAYPAL_PLANS = {
  STARTER_MONTHLY: process.env.PAYPAL_PLAN_ID_STARTER_MONTHLY || '',
  STARTER_ANNUAL: process.env.PAYPAL_PLAN_ID_STARTER_ANNUAL || '',
  PRO_MONTHLY: process.env.PAYPAL_PLAN_ID_PRO_MONTHLY || '',
  PRO_ANNUAL: process.env.PAYPAL_PLAN_ID_PRO_ANNUAL || '',
};

/**
 * Create PayPal subscription
 */
export async function createPayPalSubscription(params: {
  userId: string;
  planId: string;
  returnUrl: string;
  cancelUrl: string;
}): Promise<any> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.userId },
    });

    if (!user || !user.email) {
      throw new Error('User not found or missing email');
    }

    const controller = getSubscriptionsController();

    const subscription = await controller.createSubscription({
      body: {
        planId: params.planId,
        subscriber: {
          emailAddress: user.email,
          name: user.name
            ? {
                givenName: user.name.split(' ')[0],
                surname: user.name.split(' ').slice(1).join(' ') || user.name.split(' ')[0],
              }
            : undefined,
        },
        applicationContext: {
          brandName: 'Repost AI',
          locale: 'en-US',
          shippingPreference: ExperienceContextShippingPreference.NoShipping,
          userAction: ApplicationContextUserAction.SubscribeNow,
          returnUrl: params.returnUrl,
          cancelUrl: params.cancelUrl,
        },
        customId: params.userId, // Store userId for webhook identification
      },
    });

    return subscription;
  } catch (error) {
    loggers.error('Failed to create PayPal subscription', error as Error);
    throw new Error('Failed to create PayPal subscription');
  }
}

/**
 * Get PayPal subscription details
 */
export async function getPayPalSubscription(subscriptionId: string): Promise<any> {
  try {
    const controller = getSubscriptionsController();
    const subscription = await controller.getSubscription({ id: subscriptionId });
    return subscription;
  } catch (error) {
    loggers.error('Failed to get PayPal subscription', error as Error);
    throw new Error('Failed to get PayPal subscription');
  }
}

/**
 * Cancel PayPal subscription
 */
export async function cancelPayPalSubscription(subscriptionId: string, reason?: string): Promise<void> {
  try {
    const controller = getSubscriptionsController();
    await controller.cancelSubscription({
      id: subscriptionId,
      body: {
        reason: reason || 'User requested cancellation',
      },
    });
  } catch (error) {
    loggers.error('Failed to cancel PayPal subscription', error as Error);
    throw new Error('Failed to cancel PayPal subscription');
  }
}

/**
 * Suspend PayPal subscription
 */
export async function suspendPayPalSubscription(subscriptionId: string, reason?: string): Promise<void> {
  try {
    const controller = getSubscriptionsController();
    await controller.suspendSubscription({
      id: subscriptionId,
      body: {
        reason: reason || 'Payment issue',
      },
    });
  } catch (error) {
    loggers.error('Failed to suspend PayPal subscription', error as Error);
    throw new Error('Failed to suspend PayPal subscription');
  }
}

/**
 * Get plan from PayPal plan ID
 */
export function getPlanFromPayPalPlanId(planId: string): Plan {
  const planIdMap: Record<string, Plan> = {
    [PAYPAL_PLANS.STARTER_MONTHLY]: Plan.STARTER,
    [PAYPAL_PLANS.STARTER_ANNUAL]: Plan.STARTER,
    [PAYPAL_PLANS.PRO_MONTHLY]: Plan.PRO,
    [PAYPAL_PLANS.PRO_ANNUAL]: Plan.PRO,
  };

  return planIdMap[planId] || Plan.FREE;
}

/**
 * Check if user has active PayPal subscription
 */
export async function hasActivePayPalSubscription(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      paypalCurrentPeriodEnd: true,
      plan: true,
      paymentProvider: true,
    },
  });

  if (!user || user.plan === Plan.FREE || user.paymentProvider !== 'PAYPAL') {
    return false;
  }

  if (!user.paypalCurrentPeriodEnd) {
    return false;
  }

  return user.paypalCurrentPeriodEnd.getTime() > Date.now();
}

/**
 * Verify PayPal webhook signature
 * Note: PayPal SDK v2 doesn't have webhook verification built-in
 * You would need to use the PayPal REST API directly or trust HTTPS
 */
export async function verifyPayPalWebhook(params: {
  webhookId: string;
  headers: Record<string, string>;
  body: string;
}): Promise<boolean> {
  try {
    // For now, we'll do basic validation
    // In production, you should verify the webhook signature via PayPal's verification endpoint
    const requiredHeaders = [
      'paypal-transmission-id',
      'paypal-transmission-time',
      'paypal-transmission-sig',
    ];

    for (const header of requiredHeaders) {
      if (!params.headers[header]) {
        logger.warn(`Missing required webhook header: ${header}`);
        return false;
      }
    }

    // TODO: Implement proper webhook verification using PayPal's verify endpoint
    // https://api-m.paypal.com/v1/notifications/verify-webhook-signature
    return true;
  } catch (error) {
    loggers.error('Failed to verify PayPal webhook', error as Error);
    return false;
  }
}
