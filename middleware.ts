/**
 * Next.js Middleware
 * Handles authentication and redirects
 */

import { withAuth } from 'next-auth/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/adminAuth';

// Handle /admin/* routes before NextAuth runs
function adminMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/admin')) return null;

  // Login page is always accessible
  if (pathname === '/admin/login') return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
  return NextResponse.next();
}

export default withAuth(
  function middleware(req) {
    const adminResponse = adminMiddleware(req);
    if (adminResponse) return adminResponse;
    // Allow request to proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Admin routes handled separately above
        if (path.startsWith('/admin')) return true;

        // Public paths
        if (
          path.startsWith('/api/auth') ||
          path.startsWith('/api/webhooks') ||
          path.startsWith('/api/cron') ||
          path.startsWith('/api/trending-posts') ||
          path.startsWith('/api/admin') ||
          path === '/'
        ) {
          return true;
        }

        // Protected API routes
        if (path.startsWith('/api/')) {
          return !!token;
        }

        // Protected pages
        const protectedPaths = [
          '/generate',
          '/trending',
          '/calendar',
          '/engagement',
          '/creators',
          '/my-posts',
          '/saved',
          '/settings',
        ];

        if (protectedPaths.some((p) => path.startsWith(p))) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
