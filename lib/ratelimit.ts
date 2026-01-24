/**
 * Rate Limiting
 * Uses in-memory rate limiting by default
 * Can optionally use Upstash Redis if configured (for distributed systems)
 */

import { RateLimitError } from './errors';

// Try to import Upstash (optional dependency)
let Ratelimit: any = null;
let Redis: any = null;

try {
  const upstashRatelimit = require('@upstash/ratelimit');
  const upstashRedis = require('@upstash/redis');
  Ratelimit = upstashRatelimit.Ratelimit;
  Redis = upstashRedis.Redis;
} catch (e) {
  // Upstash not installed - will use in-memory fallback
  console.log('[Rate Limit] Using in-memory rate limiting (Upstash not installed)');
}

// Check if Upstash Redis is configured
const isRedisConfigured = !!(
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN &&
  process.env.UPSTASH_REDIS_REST_URL.startsWith('https://') &&
  Ratelimit &&
  Redis
);

// Import in-memory rate limiter
import {
  enforceRateLimit as inMemoryEnforceRateLimit,
  getRateLimitHeaders as inMemoryGetRateLimitHeaders,
  RATE_LIMIT_CONFIGS,
} from './ratelimit-inmemory';

// Create Redis client if configured
const redis = isRedisConfigured
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

/**
 * Default rate limiter: 100 requests per minute
 */
export const defaultRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'),
      analytics: true,
      prefix: '@ratelimit/default',
    })
  : null;

/**
 * AI rate limiter: 20 requests per hour
 */
export const aiRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 h'),
      analytics: true,
      prefix: '@ratelimit/ai',
    })
  : null;

/**
 * Publishing rate limiter: 10 posts per day
 */
export const publishRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '24 h'),
      analytics: true,
      prefix: '@ratelimit/publish',
    })
  : null;

/**
 * Helper function to check rate limit
 * Uses Redis if configured, otherwise falls back to in-memory
 */
export async function checkRateLimit(
  identifier: string,
  limiter: any = defaultRateLimiter,
  configKey: keyof typeof RATE_LIMIT_CONFIGS = 'default'
): Promise<void> {
  // Use Redis if configured
  if (limiter) {
    const { success, limit, reset, remaining } = await limiter.limit(identifier);

    if (!success) {
      throw new RateLimitError(
        `Rate limit exceeded. Try again in ${Math.ceil((reset - Date.now()) / 1000)} seconds`
      );
    }
    return;
  }

  // Fallback to in-memory rate limiting
  const config = RATE_LIMIT_CONFIGS[configKey];
  await inMemoryEnforceRateLimit(identifier, config);
}

/**
 * Get rate limit headers for response
 */
export async function getRateLimitHeaders(
  identifier: string,
  limiter: any = defaultRateLimiter,
  configKey: keyof typeof RATE_LIMIT_CONFIGS = 'default'
): Promise<Record<string, string>> {
  // Use Redis if configured
  if (limiter) {
    const { limit, reset, remaining } = await limiter.limit(identifier);
    return {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': reset.toString(),
    };
  }

  // Fallback to in-memory rate limiting
  const config = RATE_LIMIT_CONFIGS[configKey];
  return await inMemoryGetRateLimitHeaders(identifier, config);
}

// Log which rate limiting method is being used
if (typeof window === 'undefined') {
  if (isRedisConfigured) {
    console.log('[Rate Limit] ✅ Using Upstash Redis (distributed)');
  } else {
    console.log('[Rate Limit] ✅ Using in-memory rate limiting (single server)');
  }
}

