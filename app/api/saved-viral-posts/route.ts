/**
 * Saved Viral Posts API
 * GET /api/saved-viral-posts - List saved viral posts
 * POST /api/saved-viral-posts - Save a viral post
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/middleware/auth';
import { formatErrorResponse } from '@/lib/errors';

/**
 * GET /api/saved-viral-posts - List saved viral posts
 */
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const [savedPosts, total] = await Promise.all([
      prisma.savedViralPost.findMany({
        where: { userId: user.id },
        orderBy: { savedAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          viralPost: {
            include: {
              creator: true,
            },
          },
        },
      }),
      prisma.savedViralPost.count({
        where: { userId: user.id },
      }),
    ]);

    return NextResponse.json({
      savedPosts,
      total,
      limit,
      offset,
    });
  } catch (error) {
    const errorResponse = formatErrorResponse(error as Error);
    return NextResponse.json(errorResponse, {
      status: errorResponse.error.statusCode,
    });
  }
}

const savePostSchema = z.object({
  viralPostId: z.string(),
});

/**
 * POST /api/saved-viral-posts - Save a viral post
 */
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const data = savePostSchema.parse(body);

    // Check if already saved
    const existing = await prisma.savedViralPost.findUnique({
      where: {
        userId_viralPostId: {
          userId: user.id,
          viralPostId: data.viralPostId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    // Verify the viral post exists (using trendingPost model)
    const viralPost = await prisma.trendingPost.findUnique({
      where: { id: data.viralPostId },
    });

    if (!viralPost) {
      return NextResponse.json(
        {
          error: {
            message: 'Viral post not found',
            code: 'NOT_FOUND',
            statusCode: 404,
          },
        },
        { status: 404 }
      );
    }

    // Save post
    const savedPost = await prisma.savedViralPost.create({
      data: {
        id: nanoid(),
        userId: user.id,
        viralPostId: data.viralPostId,
      },
      include: {
        viralPost: {
          include: {
            creator: true,
          },
        },
      },
    });

    return NextResponse.json(savedPost, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            message: error.issues[0].message,
            code: 'VALIDATION_ERROR',
            statusCode: 400,
          },
        },
        { status: 400 }
      );
    }

    const errorResponse = formatErrorResponse(error as Error);
    return NextResponse.json(errorResponse, {
      status: errorResponse.error.statusCode,
    });
  }
}
