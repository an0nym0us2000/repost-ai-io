"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X, Zap, Crown, Rocket, Star } from "lucide-react";
import { useState } from "react";
import CheckoutButton from "@/components/billing/CheckoutButton";

const plans = [
  {
    name: "Free",
    icon: Star,
    price: "$0",
    priceId: "", // No Stripe price for free plan
    period: "forever",
    description: "Perfect for getting started with LinkedIn content creation",
    features: [
      { text: "10 AI-generated posts per month", included: true },
      { text: "Access to trending content", included: true },
      { text: "Basic analytics", included: true },
      { text: "Content calendar", included: true },
      { text: "Draft management", included: true },
      { text: "1 LinkedIn account", included: true },
      { text: "Email support", included: true },
      { text: "Advanced scheduling", included: false },
      { text: "Custom AI tone training", included: false },
      { text: "Priority support", included: false },
      { text: "API access", included: false },
    ],
    cta: "Get Started Free",
    href: "/auth/signin",
    popular: false,
    gradient: "from-gray-600 to-gray-700",
  },
  {
    name: "Starter",
    icon: Zap,
    price: "$19",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_STARTER || "price_starter",
    period: "per month",
    description: "For professionals serious about growing their LinkedIn presence",
    features: [
      { text: "50 AI-generated posts per month", included: true },
      { text: "Access to trending content", included: true },
      { text: "Advanced analytics & insights", included: true },
      { text: "Smart content calendar", included: true },
      { text: "Unlimited drafts", included: true },
      { text: "Up to 3 LinkedIn accounts", included: true },
      { text: "Priority email support", included: true },
      { text: "Advanced scheduling", included: true },
      { text: "Custom AI tone training", included: true },
      { text: "Content repurpose tool", included: true },
      { text: "API access", included: false },
    ],
    cta: "Start 14-Day Free Trial",
    href: "/auth/signin?plan=starter",
    popular: false,
    gradient: "from-primary to-accent",
  },
  {
    name: "Pro",
    icon: Crown,
    price: "$49",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO || "price_pro",
    period: "per month",
    description: "For power users and teams who need unlimited everything",
    features: [
      { text: "Unlimited AI-generated posts", included: true },
      { text: "Access to trending content", included: true },
      { text: "Advanced analytics & insights", included: true },
      { text: "Smart content calendar", included: true },
      { text: "Unlimited drafts", included: true },
      { text: "Unlimited LinkedIn accounts", included: true },
      { text: "Priority support (24/7)", included: true },
      { text: "Advanced scheduling", included: true },
      { text: "Custom AI tone training", included: true },
      { text: "Content repurpose tool", included: true },
      { text: "Full API access", included: true },
      { text: "White-label options", included: true },
      { text: "Team collaboration", included: true },
      { text: "Custom integrations", included: true },
    ],
    cta: "Start 14-Day Free Trial",
    href: "/auth/signin?plan=pro",
    popular: true,
    gradient: "from-accent to-primary",
  },
  {
    name: "Enterprise",
    icon: Rocket,
    price: "Custom",
    priceId: "", // Contact sales for enterprise
    period: "contact us",
    description: "For large teams and agencies with custom requirements",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom AI model training", included: true },
      { text: "SLA guarantees", included: true },
      { text: "Advanced security features", included: true },
      { text: "SAML SSO", included: true },
      { text: "Custom data retention", included: true },
      { text: "Onboarding & training", included: true },
      { text: "Quarterly business reviews", included: true },
      { text: "Custom contract terms", included: true },
    ],
    cta: "Contact Sales",
    href: "/contact?type=enterprise",
    popular: false,
    gradient: "from-primary-dark to-primary",
  },
];

const faqs = [
  {
    question: "Can I change plans later?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "What happens when I reach my generation limit?",
    answer:
      "On the Free plan, you'll need to wait until next month or upgrade to continue generating content. Paid plans have much higher or unlimited limits.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.",
  },
  {
    question: "Can I use Repost AI for multiple LinkedIn accounts?",
    answer:
      "Yes! Free plan supports 1 account, Starter supports up to 3, Pro supports unlimited, and Enterprise includes custom multi-account management.",
  },
  {
    question: "Is my LinkedIn data safe?",
    answer:
      "Absolutely. We use OAuth 2.0 for authentication and never store your LinkedIn password. All data is encrypted and we're GDPR compliant.",
  },
  {
    question: "Do you offer educational or non-profit discounts?",
    answer:
      "Yes! We offer 50% discounts for educational institutions and non-profit organizations. Contact us to verify eligibility.",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "monthly"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-light-green/20 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Simple, Transparent Pricing
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6">
              Choose the perfect plan for{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">
                your LinkedIn goals
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
              Start free, upgrade when you need more. All plans include 14-day
              free trial with no credit card required.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingPeriod === "annual"
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Annual
                <span className="ml-2 text-xs bg-accent text-white px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 ${
                  plan.popular
                    ? "border-primary shadow-2xl scale-105"
                    : "border-gray-200 dark:border-gray-700"
                } hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-accent text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6`}
                >
                  <plan.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-text-secondary mb-6 min-h-[40px]">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-text-primary">
                    {plan.price === "Custom" ? plan.price : plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-text-secondary ml-2">
                      /{billingPeriod === "annual" ? "year" : plan.period}
                    </span>
                  )}
                  {billingPeriod === "annual" && plan.price !== "$0" && plan.price !== "Custom" && (
                    <div className="text-sm text-text-secondary mt-2">
                      Billed annually at{" "}
                      {plan.price === "$19" ? "$182" : "$470"}/year
                    </div>
                  )}
                </div>

                {/* Render button based on plan */}
                {plan.name === "Free" ? (
                  <Link
                    href={plan.href}
                    className="block w-full text-center py-3 rounded-xl font-semibold transition-all mb-8 bg-gray-100 dark:bg-gray-700 text-text-primary hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {plan.cta}
                  </Link>
                ) : plan.name === "Enterprise" ? (
                  <Link
                    href={plan.href}
                    className="block w-full text-center py-3 rounded-xl font-semibold transition-all mb-8 bg-gray-100 dark:bg-gray-700 text-text-primary hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <CheckoutButton
                    priceId={plan.priceId}
                    planName={plan.name}
                    className="block w-full text-center py-3 rounded-xl font-semibold transition-all mb-8 bg-gradient-to-r from-primary to-accent text-white"
                  >
                    {plan.cta}
                  </CheckoutButton>
                )}

                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? "text-text-primary"
                            : "text-text-secondary line-through"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-light-green/30 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-text-secondary">
              Everything you need to know about pricing and plans
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {faq.question}
                </h3>
                <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary to-accent rounded-3xl p-12 text-white"
        >
          <h2 className="text-4xl font-bold mb-6">
            Still have questions?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our team is here to help you choose the right plan for your needs
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105"
          >
            Contact Sales
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
