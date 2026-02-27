# PayPal Integration Setup Guide

This guide walks you through setting up PayPal as a payment provider for Repost AI.

## Overview

The platform now supports both **Stripe** and **PayPal** as payment providers. Users can choose their preferred payment method on the pricing page.

## Prerequisites

- PayPal Business Account
- Access to PayPal Developer Dashboard
- Database with updated schema (includes PayPal fields)

## Step 1: Create PayPal App

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Navigate to **Apps & Credentials**
3. Choose **Sandbox** (for testing) or **Live** (for production)
4. Click **Create App**
5. Enter app name (e.g., "Repost AI")
6. Copy your **Client ID** and **Secret**

## Step 2: Create Subscription Plans

PayPal requires you to create subscription plans through their API or dashboard.

### Option A: Using PayPal Dashboard

1. Go to PayPal Dashboard → Products & Services → Subscriptions
2. Create plans for:
   - Starter Monthly ($19/month)
   - Starter Annual ($182/year)
   - Pro Monthly ($49/month)
   - Pro Annual ($470/year)
3. Copy the Plan IDs for each plan

### Option B: Using PayPal API

You can create plans programmatically using the PayPal API. Here's an example using curl:

```bash
# Get access token
curl -v https://api-m.sandbox.paypal.com/v1/oauth2/token \
  -H "Accept: application/json" \
  -H "Accept-Language: en_US" \
  -u "CLIENT_ID:SECRET" \
  -d "grant_type=client_credentials"

# Create a product (required for plans)
curl -v -X POST https://api-m.sandbox.paypal.com/v1/catalogs/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -d '{
    "name": "Repost AI Subscription",
    "description": "AI-powered LinkedIn content generation",
    "type": "SERVICE",
    "category": "SOFTWARE"
  }'

# Create a billing plan
curl -v -X POST https://api-m.sandbox.paypal.com/v1/billing/plans \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -d '{
    "product_id": "PRODUCT_ID_FROM_PREVIOUS_STEP",
    "name": "Starter Plan - Monthly",
    "description": "Starter plan with monthly billing",
    "billing_cycles": [
      {
        "frequency": {
          "interval_unit": "MONTH",
          "interval_count": 1
        },
        "tenure_type": "REGULAR",
        "sequence": 1,
        "total_cycles": 0,
        "pricing_scheme": {
          "fixed_price": {
            "value": "19",
            "currency_code": "USD"
          }
        }
      }
    ],
    "payment_preferences": {
      "auto_bill_outstanding": true,
      "setup_fee_failure_action": "CONTINUE",
      "payment_failure_threshold": 3
    }
  }'
```

## Step 3: Set Up Webhooks

1. In PayPal Developer Dashboard, go to your app
2. Click **Add Webhook**
3. Enter webhook URL: `https://your-domain.com/api/webhooks/paypal`
4. Select the following event types:
   - `BILLING.SUBSCRIPTION.ACTIVATED`
   - `BILLING.SUBSCRIPTION.UPDATED`
   - `BILLING.SUBSCRIPTION.CANCELLED`
   - `BILLING.SUBSCRIPTION.SUSPENDED`
   - `BILLING.SUBSCRIPTION.EXPIRED`
   - `PAYMENT.SALE.COMPLETED`
   - `PAYMENT.SALE.REFUNDED`
5. Copy the **Webhook ID**

## Step 4: Configure Environment Variables

Update your `.env` file with the PayPal credentials:

```bash
# PayPal Configuration
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
PAYPAL_MODE="sandbox"  # Use "live" for production
PAYPAL_WEBHOOK_ID="your-webhook-id"

# PayPal Plan IDs (from Step 2)
PAYPAL_PLAN_ID_STARTER_MONTHLY="P-xxxxxxxxxxxxx"
PAYPAL_PLAN_ID_STARTER_ANNUAL="P-xxxxxxxxxxxxx"
PAYPAL_PLAN_ID_PRO_MONTHLY="P-xxxxxxxxxxxxx"
PAYPAL_PLAN_ID_PRO_ANNUAL="P-xxxxxxxxxxxxx"

# Client-side PayPal Plan IDs (for pricing page)
NEXT_PUBLIC_PAYPAL_PLAN_ID_STARTER_MONTHLY="P-xxxxxxxxxxxxx"
NEXT_PUBLIC_PAYPAL_PLAN_ID_PRO_MONTHLY="P-xxxxxxxxxxxxx"
```

## Step 5: Update Database Schema

Run the Prisma migration to add PayPal fields:

```bash
# Generate Prisma client with new schema
npx prisma generate

# Push schema changes to database
npx prisma db push

# Or create and run a migration
npx prisma migrate dev --name add_paypal_support
```

## Step 6: Test the Integration

### Testing in Sandbox Mode

1. Set `PAYPAL_MODE="sandbox"` in your `.env`
2. Use sandbox credentials
3. Test with PayPal sandbox accounts:
   - Create test buyer accounts in PayPal Developer Dashboard
   - Use sandbox credentials to test payments

### Test Flow

1. Navigate to pricing page: `/pricing`
2. Select a paid plan (Starter or Pro)
3. Click "Pay with PayPal" button
4. You'll be redirected to PayPal
5. Complete the payment flow
6. You'll be redirected back to `/settings?checkout=success`
7. Verify subscription is active in database

### Testing Webhooks

Use the PayPal Webhook Simulator in the Developer Dashboard:

1. Go to your webhook in PayPal Developer
2. Click "Simulator"
3. Select event type (e.g., `BILLING.SUBSCRIPTION.ACTIVATED`)
4. Send test webhook
5. Check your application logs to verify handling

## Architecture Overview

### API Routes

- **Checkout**: `POST /api/billing/paypal/checkout`
  - Creates PayPal subscription
  - Returns approval URL

- **Success Callback**: `GET /api/billing/paypal/success`
  - Handles return from PayPal after approval
  - Updates user subscription in database

- **Subscription Management**: `/api/billing/paypal/subscription`
  - `GET` - Get current subscription
  - `DELETE` - Cancel subscription

- **Webhooks**: `POST /api/webhooks/paypal`
  - Handles PayPal webhook events
  - Updates subscription status

### Database Schema

New fields added to `User` model:
- `paypalCustomerId`
- `paypalSubscriptionId`
- `paypalPlanId`
- `paypalCurrentPeriodEnd`
- `paymentProvider` (enum: STRIPE | PAYPAL)

New fields added to `Subscription` model:
- `paymentProvider`
- `paypalSubscriptionId`
- `paypalPlanId`
- `paypalCustomerId`

### Components

- **PaymentButton**: Universal payment button supporting both Stripe and PayPal
- **CheckoutButton**: Original Stripe-only button (still used for backward compatibility)

## Going Live

1. Switch to Live credentials:
   ```bash
   PAYPAL_MODE="live"
   PAYPAL_CLIENT_ID="your-live-client-id"
   PAYPAL_CLIENT_SECRET="your-live-client-secret"
   ```

2. Create live billing plans (repeat Step 2 in Live mode)

3. Update webhook URL to production domain

4. Update environment variables with live plan IDs

5. Test thoroughly with real PayPal account

## Subscription Management

### For Users

- Users can view their subscription in `/settings`
- Shows payment provider (Stripe or PayPal)
- Can cancel subscription
- Subscription remains active until period end

### For Admins

Query subscriptions by provider:
```sql
-- Get all PayPal subscriptions
SELECT * FROM "User" WHERE "paymentProvider" = 'PAYPAL';

-- Get all active PayPal subscriptions
SELECT * FROM "Subscription"
WHERE "paymentProvider" = 'PAYPAL'
AND "status" = 'ACTIVE';
```

## Troubleshooting

### Common Issues

1. **"No approval URL found"**
   - Check PayPal credentials are correct
   - Verify plan ID exists and is active
   - Check API mode (sandbox vs live)

2. **Webhook signature verification fails**
   - Ensure `PAYPAL_WEBHOOK_ID` is set correctly
   - Verify webhook is configured in PayPal dashboard
   - Check webhook URL is accessible publicly

3. **Subscription not created after payment**
   - Check success callback route is working
   - Verify `customId` is being passed in subscription creation
   - Check database connection and permissions

4. **User still on FREE plan after payment**
   - Check webhook handler is processing events
   - Verify database update in webhook handler
   - Look for errors in application logs

### Logs

Check logs for PayPal-related operations:
```bash
# Application logs show PayPal operations
grep "PayPal" logs/app.log

# Check for webhook events
grep "BILLING.SUBSCRIPTION" logs/app.log
```

## Security Considerations

1. **Webhook Verification**: Always verify webhook signatures
2. **Environment Separation**: Never use live credentials in development
3. **Secret Management**: Store credentials securely (use environment variables)
4. **HTTPS Required**: PayPal webhooks require HTTPS in production
5. **Client ID Exposure**: Client ID can be public, but keep Secret private

## Support

- PayPal Developer Docs: https://developer.paypal.com/docs/
- PayPal Subscriptions API: https://developer.paypal.com/docs/subscriptions/
- PayPal Webhooks: https://developer.paypal.com/docs/api-basics/notifications/webhooks/

## Migration from Stripe-only

If you have existing Stripe subscriptions:

1. No action needed - they continue to work
2. New users can choose Stripe or PayPal
3. Existing users can switch by:
   - Canceling current subscription
   - Signing up with new provider

The system maintains both payment providers simultaneously.
