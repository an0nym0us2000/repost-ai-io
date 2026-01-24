/**
 * Pricing Configuration API
 * GET /api/pricing - Get pricing information with Stripe price IDs
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    plans: [
      {
        name: 'Free',
        price: 0,
        priceId: null,
        features: {
          generations: 10,
          accounts: 1,
          analytics: false,
          scheduling: false,
          support: 'email',
        },
      },
      {
        name: 'Starter',
        price: 19,
        priceId: process.env.STRIPE_PRICE_ID_STARTER,
        features: {
          generations: 50,
          accounts: 3,
          analytics: true,
          scheduling: true,
          support: 'priority',
        },
      },
      {
        name: 'Pro',
        price: 49,
        priceId: process.env.STRIPE_PRICE_ID_PRO,
        features: {
          generations: 'unlimited',
          accounts: 'unlimited',
          analytics: true,
          scheduling: true,
          support: '24/7',
          api: true,
        },
      },
      {
        name: 'Enterprise',
        price: null,
        priceId: null,
        features: {
          generations: 'unlimited',
          accounts: 'unlimited',
          analytics: true,
          scheduling: true,
          support: 'dedicated',
          api: true,
          custom: true,
        },
      },
    ],
  });
}
