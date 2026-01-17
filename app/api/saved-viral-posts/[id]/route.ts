/**
 * Individual Saved Viral Post API
 * DELETE /api/saved-viral-posts/[id] - Unsave a viral post
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/middleware/auth';
import { formatErrorResponse } from '@/lib/errors';

/**
 * DELETE /api/saved-viral-posts/[id] - Unsave a viral post
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id: viralPostId } = await params;

    // Delete the saved post
    await prisma.savedViralPost.delete({
      where: {
        userId_viralPostId: {
          userId: user.id,
          viralPostId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // If not found, still return success
    if ((error as any)?.code === 'P2025') {
      return NextResponse.json({ success: true });
    }

    const errorResponse = formatErrorResponse(error as Error);
    return NextResponse.json(errorResponse, {
      status: errorResponse.error.statusCode,
    });
  }
}
