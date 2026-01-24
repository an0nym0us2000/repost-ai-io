/**
 * Pricing Configuration
 * Centralized pricing and plan information
 */

import { Plan } from "@prisma/client";

export interface PlanInfo {
  name: string;
  price: number;
  priceId: string; // Stripe Price ID
  interval: "month" | "year";
  features: {
    generations: number | "unlimited";
    accounts: number | "unlimited";
    analytics: boolean;
    scheduling: boolean;
    support: "email" | "priority" | "24/7";
    api: boolean;
    customAI: boolean;
    whiteLabel: boolean;
    teamCollaboration: boolean;
  };
}

export const PLAN_INFO: Record<Plan, PlanInfo> = {
  [Plan.FREE]: {
    name: "Free",
    price: 0,
    priceId: "", // No Stripe price for free plan
    interval: "month",
    features: {
      generations: 10,
      accounts: 1,
      analytics: false,
      scheduling: false,
      support: "email",
      api: false,
      customAI: false,
      whiteLabel: false,
      teamCollaboration: false,
    },
  },
  [Plan.STARTER]: {
    name: "Starter",
    price: 19,
    priceId: process.env.STRIPE_PRICE_ID_STARTER || "",
    interval: "month",
    features: {
      generations: 50,
      accounts: 3,
      analytics: true,
      scheduling: true,
      support: "priority",
      api: false,
      customAI: true,
      whiteLabel: false,
      teamCollaboration: false,
    },
  },
  [Plan.PRO]: {
    name: "Pro",
    price: 49,
    priceId: process.env.STRIPE_PRICE_ID_PRO || "",
    interval: "month",
    features: {
      generations: "unlimited",
      accounts: "unlimited",
      analytics: true,
      scheduling: true,
      support: "24/7",
      api: true,
      customAI: true,
      whiteLabel: true,
      teamCollaboration: true,
    },
  },
  [Plan.ENTERPRISE]: {
    name: "Enterprise",
    price: 0, // Custom pricing
    priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE || "",
    interval: "month",
    features: {
      generations: "unlimited",
      accounts: "unlimited",
      analytics: true,
      scheduling: true,
      support: "24/7",
      api: true,
      customAI: true,
      whiteLabel: true,
      teamCollaboration: true,
    },
  },
};

/**
 * Get price ID for a plan
 */
export function getPriceId(plan: Plan): string {
  return PLAN_INFO[plan].priceId;
}

/**
 * Get plan name
 */
export function getPlanName(plan: Plan): string {
  return PLAN_INFO[plan].name;
}

/**
 * Get plan price
 */
export function getPlanPrice(plan: Plan): number {
  return PLAN_INFO[plan].price;
}

/**
 * Check if plan has feature
 */
export function planHasFeature(
  plan: Plan,
  feature: keyof PlanInfo["features"]
): boolean {
  return !!PLAN_INFO[plan].features[feature];
}

/**
 * Get generation limit for plan
 */
export function getGenerationLimit(plan: Plan): number | "unlimited" {
  return PLAN_INFO[plan].features.generations;
}

/**
 * Check if user can generate more content
 */
export function canGenerate(
  plan: Plan,
  currentGenerations: number
): boolean {
  const limit = getGenerationLimit(plan);
  if (limit === "unlimited") return true;
  return currentGenerations < limit;
}
