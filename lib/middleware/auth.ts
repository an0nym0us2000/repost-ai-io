/**
 * Authentication Middleware
 */

import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AuthenticationError, AuthorizationError } from '../errors';
import { Plan } from '@prisma/client';
import prisma from '../prisma';

/**
 * Get authenticated user from request
 */
export async function getAuthUser(req?: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new AuthenticationError();
  }

  return session.user;
}

/**
 * Require authentication
 */
export async function requireAuth(req?: NextRequest) {
  return await getAuthUser(req);
}

/**
 * Require specific plan
 */
export async function requirePlan(minPlan: Plan, req?: NextRequest) {
  const user = await getAuthUser(req);

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { plan: true },
  });

  if (!dbUser) {
    throw new AuthenticationError();
  }

  const planHierarchy: Plan[] = [Plan.FREE, Plan.STARTER, Plan.PRO, Plan.ENTERPRISE];
  const userPlanIndex = planHierarchy.indexOf(dbUser.plan);
  const requiredPlanIndex = planHierarchy.indexOf(minPlan);

  if (userPlanIndex < requiredPlanIndex) {
    throw new AuthorizationError(
      `This feature requires ${minPlan} plan or higher`
    );
  }

  return user;
}

/**
 * Get LinkedIn access token for user from database
 */
export async function getLinkedInToken(userId: string): Promise<string> {
  const account = await prisma.account.findFirst({
    where: {
      userId,
      provider: 'linkedin',
    },
    select: {
      access_token: true,
    },
  });

  if (!account?.access_token) {
    throw new AuthenticationError('LinkedIn connection required. Please connect your LinkedIn account.');
  }

  return account.access_token;
}

/**
 * Verify cron secret for scheduled jobs
 * Supports both Vercel cron (x-vercel-cron header) and manual triggers (Bearer token)
 */
export function verifyCronSecret(req: NextRequest): void {
  const authHeader = req.headers.get('authorization');
  const isVercelCron = req.headers.get('x-vercel-cron') === '1';
  const cronSecret = process.env.CRON_SECRET;

  // In production, require EITHER Vercel cron header OR valid secret
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    // Must be from Vercel OR have valid secret
    const hasValidSecret = cronSecret && authHeader === `Bearer ${cronSecret}`;

    if (!isVercelCron && !hasValidSecret) {
      throw new AuthorizationError('Invalid cron authentication - must be from Vercel or include valid secret');
    }
  } else {
    // In development, require secret
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      throw new AuthorizationError('Invalid cron secret');
    }
  }
}
