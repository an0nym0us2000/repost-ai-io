/**
 * Script to create PayPal subscription plans
 * Run: npx tsx scripts/create-paypal-plans.ts
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PAYPAL_API_BASE = process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function createProduct(accessToken: string) {
  console.log('📦 Creating PayPal Product...');

  const response = await fetch(`${PAYPAL_API_BASE}/v1/catalogs/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name: 'Repost AI Subscription',
      description: 'AI-powered LinkedIn content generation platform',
      type: 'SERVICE',
      category: 'SOFTWARE',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create product: ${error}`);
  }

  const product = await response.json();
  console.log('✅ Product created:', product.id);
  return product.id;
}

async function createPlan(
  accessToken: string,
  productId: string,
  name: string,
  price: string,
  interval: 'MONTH' | 'YEAR'
) {
  console.log(`📋 Creating plan: ${name}...`);

  const response = await fetch(`${PAYPAL_API_BASE}/v1/billing/plans`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      product_id: productId,
      name: name,
      description: `Repost AI ${name}`,
      status: 'ACTIVE',
      billing_cycles: [
        {
          frequency: {
            interval_unit: interval,
            interval_count: 1,
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0, // Infinite billing cycles
          pricing_scheme: {
            fixed_price: {
              value: price,
              currency_code: 'USD',
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
          value: '0',
          currency_code: 'USD',
        },
        setup_fee_failure_action: 'CONTINUE',
        payment_failure_threshold: 3,
      },
      taxes: {
        percentage: '0',
        inclusive: false,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(`❌ Failed to create ${name}:`, error);
    throw new Error(`Failed to create plan: ${JSON.stringify(error)}`);
  }

  const plan = await response.json();
  console.log(`✅ ${name} created:`, plan.id);
  return plan.id;
}

async function main() {
  console.log('🚀 Creating PayPal Subscription Plans...\n');

  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    console.error('❌ PayPal credentials not found in .env file');
    process.exit(1);
  }

  console.log(`📍 Using PayPal ${process.env.PAYPAL_MODE} environment\n`);

  try {
    // Step 1: Get Access Token
    console.log('🔐 Getting access token...');
    const accessToken = await getAccessToken();
    console.log('✅ Access token obtained\n');

    // Step 2: Create Product
    const productId = await createProduct(accessToken);
    console.log('');

    // Step 3: Create Plans
    const plans = {
      starterMonthly: await createPlan(accessToken, productId, 'Starter - Monthly', '19.00', 'MONTH'),
      starterAnnual: await createPlan(accessToken, productId, 'Starter - Annual', '182.00', 'YEAR'),
      proMonthly: await createPlan(accessToken, productId, 'Pro - Monthly', '49.00', 'MONTH'),
      proAnnual: await createPlan(accessToken, productId, 'Pro - Annual', '470.00', 'YEAR'),
    };

    console.log('\n✅ All plans created successfully!\n');
    console.log('📝 Copy these Plan IDs to your .env file:\n');
    console.log('━'.repeat(80));
    console.log('# Server-side Plan IDs');
    console.log(`PAYPAL_PLAN_ID_STARTER_MONTHLY="${plans.starterMonthly}"`);
    console.log(`PAYPAL_PLAN_ID_STARTER_ANNUAL="${plans.starterAnnual}"`);
    console.log(`PAYPAL_PLAN_ID_PRO_MONTHLY="${plans.proMonthly}"`);
    console.log(`PAYPAL_PLAN_ID_PRO_ANNUAL="${plans.proAnnual}"`);
    console.log('');
    console.log('# Client-side Plan IDs (for pricing page)');
    console.log(`NEXT_PUBLIC_PAYPAL_PLAN_ID_STARTER_MONTHLY="${plans.starterMonthly}"`);
    console.log(`NEXT_PUBLIC_PAYPAL_PLAN_ID_PRO_MONTHLY="${plans.proMonthly}"`);
    console.log('━'.repeat(80));
    console.log('');
  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
