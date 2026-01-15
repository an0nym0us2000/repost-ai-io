# Security Audit Report
**Date:** December 31, 2025
**Application:** Repost AI - LinkedIn Content Generator
**Auditor:** Claude Sonnet 4.5

---

## Executive Summary

This security audit identified **14 security vulnerabilities** ranging from **CRITICAL** to **LOW** severity. The most critical issues involve:
- Missing Vercel cron authentication bypass
- SQL injection vulnerabilities in vector search
- LinkedIn token exposure in JWT
- Missing CSRF protection
- Insufficient file upload validation

**Overall Risk Level: HIGH** ⚠️

---

## Critical Vulnerabilities (🔴 Priority 1)

### 1. **Cron Job Authentication Bypass** - CRITICAL
**File:** `lib/middleware/auth.ts:76-82`

**Issue:** The `verifyCronSecret()` function only checks the Authorization header but doesn't verify Vercel's `x-vercel-cron` header. An attacker can bypass authentication by simply including the header without the secret.

**Current Code:**
```typescript
export function verifyCronSecret(req: NextRequest): void {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    throw new AuthorizationError('Invalid cron secret');
  }
}
```

**Vulnerability:**
Middleware at [middleware.ts:23](middleware.ts#L23) allows `/api/cron` paths without token authentication. This means:
1. Unauthenticated users can access cron endpoints if they know the route
2. No validation that request actually came from Vercel
3. Auto-publish and sync-engagement endpoints are exposed

**Attack Scenario:**
```bash
# Attacker can trigger auto-publish without authentication
curl https://repost-ai-io.vercel.app/api/cron/publish
```

**Impact:**
- Unauthorized triggering of scheduled posts
- Data manipulation
- Resource exhaustion (rate limit bypass)

**Fix:**
```typescript
export function verifyCronSecret(req: NextRequest): void {
  const authHeader = req.headers.get('authorization');
  const isVercelCron = req.headers.get('x-vercel-cron') === '1';
  const cronSecret = process.env.CRON_SECRET;

  // In production, REQUIRE either Vercel cron header OR valid secret
  if (process.env.NODE_ENV === 'production') {
    // Must be from Vercel OR have valid secret
    if (!isVercelCron && (!cronSecret || authHeader !== `Bearer ${cronSecret}`)) {
      throw new AuthorizationError('Invalid cron authentication');
    }
  } else {
    // In dev, require secret
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      throw new AuthorizationError('Invalid cron secret');
    }
  }
}
```

---

### 2. **SQL Injection in Vector Search** - CRITICAL
**File:** `lib/vector-search.ts:72-91`

**Issue:** Uses `$queryRawUnsafe` with string interpolation for `minSimilarity`, allowing SQL injection.

**Vulnerable Code:**
```typescript
const query = `
  SELECT /* ... */
  WHERE embedding IS NOT NULL
    AND (1 - (embedding <=> $1::vector)) >= ${minSimilarity}  // ❌ INJECTION HERE
    ${whereClause}
  ORDER BY embedding <=> $1::vector
  LIMIT $2
`;

const results = await prisma.$queryRawUnsafe<ViralPostResult[]>(query, ...params);
```

**Attack Scenario:**
```typescript
// Attacker calls API with malicious minSimilarity
searchSimilarPosts(embedding, {
  minSimilarity: "0.7; DROP TABLE viral_posts; --"
});
```

**Impact:**
- Database manipulation
- Data exfiltration
- Complete database compromise

**Fix:**
```typescript
// Use parameterized query
const query = `
  SELECT /* ... */
  WHERE embedding IS NOT NULL
    AND (1 - (embedding <=> $1::vector)) >= $3  -- Use parameter
    ${whereClause}
  ORDER BY embedding <=> $1::vector
  LIMIT $2
`;

// Add minSimilarity as parameter
params.unshift(minSimilarity);  // Insert at beginning
const results = await prisma.$queryRawUnsafe<ViralPostResult[]>(query, minSimilarity, embeddingStr, limit, ...params);
```

---

### 3. **Missing File Type Validation** - CRITICAL
**File:** `app/api/upload/route.ts:15-69`

**Issue:** No validation of file type, size, or content. Accepts any file type without restrictions.

**Vulnerable Code:**
```typescript
export async function POST(req: NextRequest) {
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // ❌ NO FILE TYPE VALIDATION
  // ❌ NO FILE SIZE VALIDATION
  // ❌ NO CONTENT VALIDATION

  const url = await uploadFile(file, user.id, folder);
  return NextResponse.json({ url });
}
```

**Attack Scenario:**
1. Upload malicious executable disguised as image
2. Upload extremely large file to exhaust storage
3. Upload HTML file with XSS payload

**Impact:**
- Storage exhaustion
- Malware distribution
- XSS attacks via uploaded files

**Fix:**
```typescript
// Add validation
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  documents: ['application/pdf', 'text/plain', 'text/csv'],
  media: ['image/jpeg', 'image/png', 'video/mp4', 'video/webm'],
};

// Validate file type
const allowedTypes = ALLOWED_TYPES[folder] || ALLOWED_TYPES.media;
if (!allowedTypes.includes(file.type)) {
  return NextResponse.json(
    { error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` },
    { status: 400 }
  );
}

// Validate file size
if (file.size > MAX_FILE_SIZE) {
  return NextResponse.json(
    { error: `File too large. Max size: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
    { status: 400 }
  );
}

// Validate file name (prevent path traversal)
const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
```

---

## High Vulnerabilities (🟠 Priority 2)

### 4. **LinkedIn Access Token Stored in JWT** - HIGH
**File:** `lib/auth.ts:90-94`, `lib/middleware/auth.ts:63-71`

**Issue:** LinkedIn access tokens are stored in JWT and exposed in session. If JWT is compromised, attacker gains full LinkedIn access.

**Vulnerable Code:**
```typescript
// lib/middleware/auth.ts
export async function getLinkedInToken(): Promise<string> {
  const session = await getServerSession(authOptions);

  if (!session?.linkedInAccessToken) {
    throw new AuthenticationError('LinkedIn connection required');
  }

  return session.linkedInAccessToken;  // ❌ Token in JWT
}
```

**Impact:**
- If JWT leaks, attacker has LinkedIn API access
- Tokens persist in JWT even after revocation
- No token refresh handling

**Fix:**
Store tokens in database, only store token ID in JWT:
```typescript
// Store in database
model Account {
  id                String  @id
  userId            String
  access_token      String? @db.Text  // Encrypted
  refresh_token     String? @db.Text  // Encrypted
  expires_at        Int?
  // ...
}

// Retrieve from database
export async function getLinkedInToken(userId: string): Promise<string> {
  const account = await prisma.account.findFirst({
    where: {
      userId,
      provider: 'linkedin'
    },
    select: { access_token: true, expires_at: true }
  });

  if (!account?.access_token) {
    throw new AuthenticationError('LinkedIn connection required');
  }

  // Check expiration and refresh if needed
  if (account.expires_at && account.expires_at < Date.now() / 1000) {
    // Refresh token logic here
  }

  return account.access_token;
}
```

---

### 5. **Insecure Prisma Raw Queries** - HIGH
**Files:** Multiple files using `$executeRaw` and `$queryRawUnsafe`

**Issue:** Several locations use raw SQL without proper parameter binding:

1. **app/api/viral/upload/route.ts:85-96** - Template literals in raw query
```typescript
await prisma.$executeRaw`
  INSERT INTO viral_posts (text, author, category, tone, hook_style, viral_score, embedding)
  VALUES (
    ${post.text},           // ❌ Direct interpolation
    ${post.author},         // ❌ Not escaped
    ${post.category},       // ❌ Vulnerable
    ${post.tone},
    ${post.hookStyle},
    ${post.viralScore},
    ${post.embedding}::vector
  )
`;
```

**Impact:** While Prisma's tagged template provides some protection, it's still risky with user-controlled data.

**Fix:** Use Prisma ORM methods when possible, or ensure all user input is validated:
```typescript
// Validate all inputs first
const safePost = {
  text: z.string().max(5000).parse(post.text),
  author: z.string().max(255).parse(post.author),
  category: z.enum(['...allowed values...']).parse(post.category),
  // ... etc
};

// Then use in raw query
await prisma.$executeRaw`
  INSERT INTO viral_posts (...)
  VALUES (${safePost.text}, ${safePost.author}, ...)
`;
```

---

### 6. **Missing CSRF Protection** - HIGH
**All API Routes**

**Issue:** No CSRF token validation on state-changing operations (POST, PATCH, DELETE).

**Vulnerable Routes:**
- `/api/posts` - Create posts
- `/api/posts/[id]` - Update/delete posts
- `/api/settings` - Update settings
- `/api/billing/*` - Payment operations

**Attack Scenario:**
```html
<!-- Malicious site -->
<form action="https://repost-ai-io.vercel.app/api/posts" method="POST">
  <input name="content" value="Spam post" />
</form>
<script>document.forms[0].submit();</script>
```

**Impact:**
- Unauthorized actions on behalf of authenticated users
- Data manipulation
- Account takeover scenarios

**Fix:** Add CSRF protection using Next.js middleware:
```typescript
// lib/middleware/csrf.ts
import { createCsrfProtect } from '@edge-csrf/nextjs';

const csrfProtect = createCsrfProtect({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    name: '__Host-csrf',
  },
});

export async function validateCsrf(req: NextRequest) {
  const error = await csrfProtect(req);
  if (error) {
    throw new AuthorizationError('Invalid CSRF token');
  }
}
```

---

### 7. **Weak Password Requirements** - HIGH
**File:** `app/api/auth/signup/route.ts:15`

**Issue:** Only requires 8 character minimum, no complexity requirements.

**Current Validation:**
```typescript
password: z.string().min(8, 'Password must be at least 8 characters'),
```

**Attack Scenario:** Users can create weak passwords like "password" or "12345678".

**Fix:**
```typescript
password: z.string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
```

---

## Medium Vulnerabilities (🟡 Priority 3)

### 8. **Rate Limiting Can Be Bypassed** - MEDIUM
**File:** `lib/ratelimit.ts:68-85`

**Issue:** Rate limiting is silently skipped if Redis is not configured. In production without Redis, there's NO rate limiting.

**Vulnerable Code:**
```typescript
export async function checkRateLimit(
  identifier: string,
  limiter: Ratelimit | null = defaultRateLimiter
): Promise<void> {
  if (!limiter) {
    console.log('[Rate Limit] Skipping - Redis not configured');  // ❌ Just logs
    return;  // ❌ No protection
  }
  // ...
}
```

**Impact:**
- API abuse
- Resource exhaustion
- Cost explosion (AI API calls)

**Fix:** Use in-memory fallback when Redis is unavailable:
```typescript
import { LRUCache } from 'lru-cache';

// Fallback in-memory rate limiter
const memoryCache = new LRUCache<string, number[]>({
  max: 10000,
  ttl: 60000, // 1 minute
});

function checkRateLimitMemory(identifier: string, limit: number, window: number): boolean {
  const now = Date.now();
  const timestamps = memoryCache.get(identifier) || [];

  // Remove old timestamps
  const validTimestamps = timestamps.filter(t => now - t < window);

  if (validTimestamps.length >= limit) {
    return false;
  }

  validTimestamps.push(now);
  memoryCache.set(identifier, validTimestamps);
  return true;
}

export async function checkRateLimit(
  identifier: string,
  limiter: Ratelimit | null = defaultRateLimiter,
  fallbackLimit: number = 100,
  fallbackWindow: number = 60000
): Promise<void> {
  if (!limiter) {
    // Use in-memory fallback
    if (!checkRateLimitMemory(identifier, fallbackLimit, fallbackWindow)) {
      throw new RateLimitError('Rate limit exceeded');
    }
    return;
  }
  // ... Redis logic
}
```

---

### 9. **No User Enumeration Protection** - MEDIUM
**File:** `app/api/auth/signup/route.ts:27-33`

**Issue:** Different error messages reveal whether email exists.

**Vulnerable Code:**
```typescript
const existingUser = await prisma.user.findUnique({
  where: { email: validatedData.email },
});

if (existingUser) {
  throw new ValidationError('Email already registered');  // ❌ Reveals email exists
}
```

**Attack Scenario:** Attacker can enumerate valid user emails by attempting signup.

**Fix:** Use generic error message and add timing-safe comparison:
```typescript
if (existingUser) {
  // Log for monitoring, but don't reveal to user
  logger.warn('Signup attempt with existing email', { email: validatedData.email });

  // Simulate password hashing delay to prevent timing attacks
  await hash('dummy-password', 12);

  // Generic error
  throw new ValidationError('If this email is not registered, an account will be created.');
}
```

---

### 10. **Missing Request Size Limits** - MEDIUM
**Multiple API Routes**

**Issue:** No body size limits on API routes. Attacker can send extremely large payloads.

**Attack Scenario:**
```bash
# Send 100MB JSON payload
curl -X POST https://repost-ai-io.vercel.app/api/generate \
  -d "$(python -c 'print("{\"topic\":\"" + "A"*100000000 + "\"}")')"
```

**Impact:**
- Memory exhaustion
- DoS attacks
- Increased hosting costs

**Fix:** Add body size limits in Next.js config:
```typescript
// next.config.mjs
export default {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  // ... rest of config
};
```

---

### 11. **Admin API Key in Environment Variable** - MEDIUM
**File:** `app/api/viral/upload/route.ts:26`

**Issue:** Admin API key stored in plain text environment variable.

**Current Code:**
```typescript
const adminKey = process.env.ADMIN_API_KEY;

if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

**Risk:** If `.env` file is exposed or environment variables leak, full admin access is granted.

**Fix:** Implement proper admin authentication with database-stored credentials:
```typescript
// Store admin users in database
model AdminUser {
  id        String   @id
  email     String   @unique
  apiKey    String   @unique  // Hashed
  name      String
  createdAt DateTime @default(now())
}

// Validate admin API key
async function validateAdminKey(apiKey: string): Promise<boolean> {
  const hashedKey = await hash(apiKey, 10);
  const admin = await prisma.adminUser.findUnique({
    where: { apiKey: hashedKey }
  });
  return !!admin;
}
```

---

## Low Vulnerabilities (🟢 Priority 4)

### 12. **Missing Security Headers** - LOW
**File:** `next.config.mjs:32-52`

**Issue:** Missing several important security headers:
- `Content-Security-Policy` - Not implemented
- `Permissions-Policy` - Not implemented
- `X-XSS-Protection` - Not implemented
- `Strict-Transport-Security` - Vercel adds this, but should be explicit

**Fix:**
```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' data:",
            "connect-src 'self' https://api.stripe.com https://*.supabase.co",
            "frame-src https://js.stripe.com",
          ].join('; '),
        },
      ],
    },
  ];
}
```

---

### 13. **Insufficient Logging** - LOW
**Multiple Files**

**Issue:** Sensitive operations lack audit logging:
- No logging when cron jobs are triggered
- No logging for failed authentication attempts
- No logging for authorization failures

**Fix:** Add comprehensive audit logging:
```typescript
// Enhanced logging for security events
logger.security('Failed login attempt', {
  email: credentials.email,
  ip: req.headers.get('x-forwarded-for'),
  userAgent: req.headers.get('user-agent')
});

logger.security('Cron job triggered', {
  endpoint: req.url,
  ip: req.headers.get('x-forwarded-for'),
  isVercel: req.headers.get('x-vercel-cron') === '1'
});
```

---

### 14. **No Account Lockout** - LOW
**File:** `lib/auth.ts:75-87`

**Issue:** No protection against brute force login attempts. Unlimited login attempts allowed.

**Fix:** Implement account lockout:
```typescript
// Track failed attempts
model LoginAttempt {
  id        String   @id
  email     String
  ip        String
  success   Boolean
  timestamp DateTime @default(now())

  @@index([email, timestamp])
  @@index([ip, timestamp])
}

// Check failed attempts before authentication
async function checkFailedAttempts(email: string): Promise<void> {
  const recentAttempts = await prisma.loginAttempt.count({
    where: {
      email,
      success: false,
      timestamp: { gte: new Date(Date.now() - 15 * 60 * 1000) } // Last 15 minutes
    }
  });

  if (recentAttempts >= 5) {
    throw new AuthenticationError('Account temporarily locked due to multiple failed attempts');
  }
}
```

---

## Additional Recommendations

### 1. **Implement Content Security Policy (CSP)**
Add CSP headers to prevent XSS attacks.

### 2. **Add API Request Signing**
For sensitive operations, implement request signing to prevent replay attacks.

### 3. **Implement Secrets Rotation**
Set up automatic rotation for API keys and secrets.

### 4. **Add Web Application Firewall (WAF)**
Use Vercel WAF or Cloudflare to add an additional security layer.

### 5. **Enable Database Encryption at Rest**
Ensure sensitive data in database is encrypted.

### 6. **Implement Session Invalidation**
Add ability to invalidate all sessions on password change.

### 7. **Add Security Monitoring**
Integrate with services like Sentry or LogRocket for security monitoring.

---

## Priority Implementation Order

1. **Immediate (Week 1):**
   - Fix cron job authentication bypass
   - Fix SQL injection in vector search
   - Add file upload validation
   - Add CSRF protection

2. **Short-term (Week 2-3):**
   - Remove LinkedIn token from JWT
   - Fix Prisma raw query usage
   - Strengthen password requirements
   - Implement rate limiting fallback

3. **Medium-term (Month 1):**
   - Add security headers
   - Implement audit logging
   - Add account lockout
   - Add request size limits

4. **Long-term (Month 2-3):**
   - Implement CSP
   - Add request signing
   - Set up secrets rotation
   - Add WAF integration

---

## Testing Recommendations

### Security Testing Tools:
1. **OWASP ZAP** - Automated vulnerability scanning
2. **Burp Suite** - Manual penetration testing
3. **npm audit** - Dependency vulnerability scanning
4. **Snyk** - Continuous security monitoring

### Test Cases:
- SQL injection attempts
- CSRF token bypass
- Authentication bypass attempts
- Rate limit testing
- File upload security
- XSS payload injection

---

## Compliance Considerations

### GDPR:
- Ensure user data can be exported (right to data portability)
- Implement data deletion (right to be forgotten)
- Add consent management for data processing

### SOC 2:
- Implement comprehensive audit logging
- Add encryption for data in transit and at rest
- Implement access controls and separation of duties

---

## Conclusion

The application has **14 identified security vulnerabilities** that need to be addressed. The most critical issues are:

1. Cron job authentication bypass (CRITICAL)
2. SQL injection vulnerabilities (CRITICAL)
3. Missing file upload validation (CRITICAL)

**Immediate action is required** to fix the critical vulnerabilities before the application handles production traffic at scale.

**Estimated effort:** 2-3 weeks for full remediation with testing.

---

*End of Security Audit Report*
