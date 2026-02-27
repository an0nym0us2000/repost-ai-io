# Stripe Integration Setup Guide

This guide will walk you through setting up Stripe for Repost AI's subscription billing.

## Prerequisites

- Stripe account (create one at [stripe.com](https://stripe.com))
- Access to your Stripe Dashboard
- Local development environment set up

## Step 1: Get Your Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Click on "Developers" in the left sidebar
3. Click on "API keys"
4. Copy your **Publishable key** and **Secret key**
   - For testing, use the TEST keys
   - For production, use the LIVE keys

## Step 2: Create Products and Prices

### Option A: Using Stripe Dashboard (Recommended)

1. Go to **Products** in the Stripe Dashboard
2. Click **"+ Add product"**

Create three products:

#### 1. Starter Plan
- **Name**: Repost AI - Starter
- **Description**: For professionals serious about growing their LinkedIn presence
- **Pricing**:
  - **Price**: $19
  - **Billing period**: Monthly (recurring)
  - **Currency**: USD
- Click **Save product**
- **Copy the Price ID** (starts with `price_xxx`)

#### 2. Pro Plan
- **Name**: Repost AI - Pro
- **Description**: For power users and teams who need unlimited everything
- **Pricing**:
  - **Price**: $49
  - **Billing period**: Monthly (recurring)
  - **Currency**: USD
- Click **Save product**
- **Copy the Price ID** (starts with `price_xxx`)

#### 3. Enterprise Plan (Optional)
- **Name**: Repost AI - Enterprise
- **Description**: For large teams with custom requirements
- **Pricing**: Contact sales (don't create a price)

### Option B: Using Stripe CLI

```bash
# Create Starter product and price
stripe products create \
  --name "Repost AI - Starter" \
  --description "For professionals serious about growing their LinkedIn presence"

stripe prices create \
  --product <PRODUCT_ID_FROM_ABOVE> \
  --unit-amount 1900 \
  --currency usd \
  --recurring[interval]=month

# Create Pro product and price
stripe products create \
  --name "Repost AI - Pro" \
  --description "For power users and teams who need unlimited everything"

stripe prices create \
  --product <PRODUCT_ID_FROM_ABOVE> \
  --unit-amount 4900 \
  --currency usd \
  --recurring[interval]=month
```

## Step 3: Configure Webhooks

Webhooks allow Stripe to notify your app about payment events.

### For Local Development:

1. Install Stripe CLI:
   ```bash
   # Windows (using Scoop)
   scoop install stripe

   # macOS
   brew install stripe/stripe-cli/stripe

   # Or download from https://github.com/stripe/stripe-cli/releases
   ```

2. Login to Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copy the webhook signing secret** (starts with `whsec_xxx`)

### For Production:

1. Go to **Developers > Webhooks** in Stripe Dashboard
2. Click **"+ Add endpoint"**
3. **Endpoint URL**: `https://yourdomain.com/api/webhooks/stripe`
4. **Select events to listen to**:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. **Copy the Signing secret** (starts with `whsec_xxx`)

## Step 4: Update Environment Variables

Add these to your `.env` file:

```env
# Stripe API Keys
STRIPE_SECRET_KEY="sk_test_your_secret_key_here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"

# Stripe Webhook Secret
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"

# Stripe Price IDs (from Step 2)
STRIPE_PRICE_ID_STARTER="price_xxxxxxxxx"
STRIPE_PRICE_ID_PRO="price_xxxxxxxxx"
STRIPE_PRICE_ID_ENTERPRISE="price_xxxxxxxxx"  # Optional

# App URL (for redirects)
APP_URL="http://localhost:3000"  # Change to your domain in production
```

## Step 5: Test the Integration

### 1. Start your development server:
```bash
npm run dev
```

### 2. In another terminal, start Stripe webhook forwarding:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 3. Test the checkout flow:

1. Go to `http://localhost:3000/pricing`
2. Click on a paid plan (Starter or Pro)
3. You'll be redirected to Stripe Checkout
4. Use test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Requires authentication**: `4000 0025 0000 3155`
5. Use any future expiration date
6. Use any CVC and ZIP code
7. Complete the checkout

### 4. Verify the subscription:

1. Check your Stripe Dashboard > Payments
2. Check your database for the subscription record
3. Check that the user's plan was updated

## Step 6: Configure Stripe Customer Portal

The Customer Portal allows users to manage their subscriptions.

1. Go to **Settings > Billing > Customer portal** in Stripe Dashboard
2. **Configure settings**:
   - Enable **"Cancel subscriptions"**
   - Enable **"Update payment method"**
   - Enable **"View invoice history"**
   - Set cancellation behavior (immediate or at period end)
3. **Save changes**

## Step 7: Production Deployment

### Before Going Live:

1. **Switch to Live Keys**:
   - Replace all test keys with live keys in `.env`
   - Update webhook endpoint in Stripe Dashboard

2. **Set up production webhook**:
   - Add production endpoint URL
   - Copy new webhook signing secret
   - Update `STRIPE_WEBHOOK_SECRET` in production environment

3. **Test with real card** (small amount):
   - Test the full flow with a real card
   - Immediately refund if testing

4. **Enable Stripe Radar** (fraud prevention):
   - Go to Radar in Stripe Dashboard
   - Configure rules for fraud detection

5. **Set up tax collection** (if applicable):
   - Go to **Settings > Tax**
   - Configure tax rates for your regions

## API Endpoints

Your app includes these Stripe-related endpoints:

- `POST /api/billing/checkout` - Create checkout session
- `POST /api/billing/portal` - Open customer portal
- `GET /api/billing/subscription` - Get current subscription
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

## Testing Webhook Events

You can manually trigger webhook events for testing:

```bash
# Test successful payment
stripe trigger payment_intent.succeeded

# Test subscription created
stripe trigger customer.subscription.created

# Test payment failed
stripe trigger invoice.payment_failed
```

## Troubleshooting

### Webhook signature verification failed
- Make sure `STRIPE_WEBHOOK_SECRET` matches your webhook signing secret
- Ensure you're using the raw request body (not parsed JSON)

### Checkout session not creating
- Verify `STRIPE_SECRET_KEY` is correct
- Check that price IDs are valid
- Ensure user is authenticated

### Subscription not updating in database
- Check webhook endpoint is accessible
- Verify webhook events are being received (check Stripe Dashboard > Developers > Webhooks)
- Check application logs for errors

### Customer portal not working
- Ensure customer has a valid Stripe customer ID
- Verify customer portal is enabled in Stripe settings

## Security Best Practices

1. **Never expose secret keys** in client-side code
2. **Always verify webhook signatures** before processing
3. **Use HTTPS** in production for webhook endpoints
4. **Store minimal card data** (let Stripe handle it)
5. **Enable Stripe Radar** for fraud prevention
6. **Set up alerts** for failed payments
7. **Regular backup** of subscription data
8. **Monitor webhook delivery** for failures

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe Security](https://stripe.com/docs/security)

## Support

If you encounter issues:
1. Check Stripe Dashboard > Developers > Logs
2. Check application logs
3. Review webhook delivery attempts
4. Contact Stripe support: https://support.stripe.com
