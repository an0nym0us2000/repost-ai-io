/**
 * Check if a viral post is saved
 * GET /api/saved-viral-posts/check?viralPostId=xxx
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ isSaved: false });
    }

    const { searchParams } = new URL(req.url);
    const viralPostId = searchParams.get('viralPostId');

    if (!viralPostId) {
      return NextResponse.json({ isSaved: false });
    }

    const saved = await prisma.savedViralPost.findUnique({
      where: {
        userId_viralPostId: {
          userId: session.user.id,
          viralPostId,
        },
      },
    });

    return NextResponse.json({ isSaved: !!saved });
  } catch (error) {
    return NextResponse.json({ isSaved: false });
  }
}
