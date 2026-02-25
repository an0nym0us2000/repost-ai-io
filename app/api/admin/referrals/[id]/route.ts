import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const updateData: Record<string, unknown> = {};
  if (body.discountPct !== undefined) updateData.discountPct = parseInt(body.discountPct);
  if (body.rewardCredits !== undefined) updateData.rewardCredits = parseInt(body.rewardCredits);
  if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);
  if (body.code !== undefined) updateData.code = body.code.toUpperCase().trim();

  const referralCode = await prisma.referralCode.update({ where: { id: params.id }, data: updateData });
  return NextResponse.json({ referralCode });
}
