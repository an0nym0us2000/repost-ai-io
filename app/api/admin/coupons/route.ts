import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const coupons = await prisma.couponCode.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { CouponUse: true } } },
  });

  return NextResponse.json({ coupons });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { code, type, discountPct, credits, maxUses, expiresAt, isActive } = body;

  if (!code || !type) {
    return NextResponse.json({ error: 'code and type are required' }, { status: 400 });
  }

  const coupon = await prisma.couponCode.create({
    data: {
      id: nanoid(),
      code: code.toUpperCase().trim(),
      type,
      discountPct: discountPct ? parseInt(discountPct) : null,
      credits: credits ? parseInt(credits) : null,
      maxUses: maxUses ? parseInt(maxUses) : null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      isActive: isActive !== false,
    },
  });

  return NextResponse.json({ coupon }, { status: 201 });
}
