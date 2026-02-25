import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const referralCodes = await prisma.referralCode.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      User: { select: { name: true, email: true } },
      _count: { select: { Referrals: true } },
    },
  });

  return NextResponse.json({ referralCodes });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId, code, discountPct, rewardCredits } = await req.json();
  if (!userId || !code) {
    return NextResponse.json({ error: 'userId and code are required' }, { status: 400 });
  }

  const referralCode = await prisma.referralCode.create({
    data: {
      id: nanoid(),
      userId,
      code: code.toUpperCase().trim(),
      discountPct: discountPct ? parseInt(discountPct) : 20,
      rewardCredits: rewardCredits ? parseInt(rewardCredits) : 10,
    },
  });

  return NextResponse.json({ referralCode }, { status: 201 });
}
