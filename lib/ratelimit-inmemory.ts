/**
 * In-Memory Rate Limiting
 * No external dependencies - works out of the box
 * Uses sliding window algorithm with automatic cleanup
 */

import { RateLimitError } from './errors';

interface RateLimitRecord {
  count: number;
  resetAt: number;
  requests: number[]; // Timestamps of requests for sliding window
}

// Store rate limit data in memory
const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup old entries every 5 minutes
let cleanupInterval: NodeJS.Timeout | null = null;

function startCleanup() {
  if (cleanupInterval) return;

  cleanupInterval = setInterval(() => {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, record] of rateLimitStore.entries()) {
      if (record.resetAt < now) {
        rateLimitStore.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`[Rate Limit] Cleaned ${cleaned} expired entries`);
    }
  }, 5 * 60 * 1000); // Every 5 minutes
}

// Start cleanup on module load
if (typeof window === 'undefined') {
  startCleanup();
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  message?: string;
}

export const RATE_LIMIT_CONFIGS = {
  // Default: 100 requests per minute
  default: {
    maxRequests: 100,
    windowMs: 60 * 1000,
    message: 'Too many requests, please try again later',
  },

  // AI generation: 20 requests per hour
  ai: {
    maxRequests: 20,
    windowMs: 60 * 60 * 1000,
    message: 'AI generation rate limit exceeded. Please try again in an hour',
  },

  // Publishing: 10 posts per day
  publish: {
    maxRequests: 10,
    windowMs: 24 * 60 * 60 * 1000,
    message: 'Daily publishing limit reached. Upgrade to increase your limit',
  },

  // Authentication: 5 attempts per 15 minutes
  auth: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
    message: 'Too many login attempts. Please try again in 15 minutes',
  },

  // Free tier AI: 10 requests per hour
  aiFree: {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000,
    message: 'Free tier limit reached. Upgrade for more generations per hour',
  },
} as const;

/**
 * Check rate limit using sliding window algorithm
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = RATE_LIMIT_CONFIGS.default
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  const now = Date.now();
  const key = identifier;

  let record = rateLimitStore.get(key);

  if (!record) {
    // First request from this identifier
    record = {
      count: 0,
      resetAt: now + config.windowMs,
      requests: [],
    };
    rateLimitStore.set(key, record);
  }

  // Remove requests outside the sliding window
  record.requests = record.requests.filter(
    timestamp => timestamp > now - config.windowMs
  );

  // Update reset time if window has passed
  if (record.resetAt < now) {
    record.resetAt = now + config.windowMs;
    record.count = 0;
  }

  const currentCount = record.requests.length;
  const remaining = Math.max(0, config.maxRequests - currentCount);
  const success = currentCount < config.maxRequests;

  if (success) {
    // Allow the request
    record.requests.push(now);
    record.count = currentCount + 1;
  }

  return {
    success,
    limit: config.maxRequests,
    remaining: success ? remaining - 1 : remaining,
    reset: record.resetAt,
  };
}

/**
 * Enforce rate limit - throws error if limit exceeded
 */
export async function enforceRateLimit(
  identifier: string,
  config: RateLimitConfig = RATE_LIMIT_CONFIGS.default
): Promise<void> {
  const result = await checkRateLimit(identifier, config);

  if (!result.success) {
    const resetIn = Math.ceil((result.reset - Date.now()) / 1000);
    throw new RateLimitError(
      config.message || `Rate limit exceeded. Try again in ${resetIn} seconds`
    );
  }
}

/**
 * Get rate limit headers for response
 */
export async function getRateLimitHeaders(
  identifier: string,
  config: RateLimitConfig = RATE_LIMIT_CONFIGS.default
): Promise<Record<string, string>> {
  const result = await checkRateLimit(identifier, config);

  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  };
}

/**
 * Reset rate limit for an identifier (useful for testing or manual reset)
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

/**
 * Get current rate limit stats for monitoring
 */
export function getRateLimitStats(): {
  totalKeys: number;
  memoryUsage: number;
} {
  return {
    totalKeys: rateLimitStore.size,
    memoryUsage: Math.round(
      JSON.stringify([...rateLimitStore.entries()]).length / 1024
    ), // Approximate KB
  };
}

/**
 * Clear all rate limit data (use with caution)
 */
export function clearAllRateLimits(): void {
  rateLimitStore.clear();
  console.log('[Rate Limit] All rate limits cleared');
}

/**
 * Stop cleanup interval (useful for testing)
 */
export function stopCleanup(): void {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
}

// Export for backward compatibility
export const defaultRateLimiter = {
  limit: (identifier: string) => checkRateLimit(identifier, RATE_LIMIT_CONFIGS.default),
};

export const aiRateLimiter = {
  limit: (identifier: string) => checkRateLimit(identifier, RATE_LIMIT_CONFIGS.ai),
};

export const publishRateLimiter = {
  limit: (identifier: string) => checkRateLimit(identifier, RATE_LIMIT_CONFIGS.publish),
};
