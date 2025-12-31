import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/auth/error
 * Handle NextAuth errors and redirect to error page
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const error = searchParams.get('error');

  // Redirect to the error page with the error parameter
  const errorPageUrl = new URL('/auth/error', request.url);
  if (error) {
    errorPageUrl.searchParams.set('error', error);
  }

  return NextResponse.redirect(errorPageUrl);
}
