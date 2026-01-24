/**
 * Rate Limit Stats API (Admin Only)
 * GET /api/admin/rate-limit-stats - Get rate limiting statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware/auth';
import { formatErrorResponse } from '@/lib/errors';
import { getRateLimitStats } from '@/lib/ratelimit-inmemory';

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();

    // TODO: Add admin check
    // For now, any authenticated user can view stats
    // In production, add: if (user.role !== 'ADMIN') throw new AuthorizationError();

    const stats = getRateLimitStats();

    return NextResponse.json({
      success: true,
      stats: {
        totalKeys: stats.totalKeys,
        memoryUsageKB: stats.memoryUsage,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    const errorResponse = formatErrorResponse(error as Error);
    return NextResponse.json(errorResponse, {
      status: errorResponse.error.statusCode,
    });
  }
}
