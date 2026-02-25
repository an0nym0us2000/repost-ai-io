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
  if (body.code !== undefined) updateData.code = body.code.toUpperCase().trim();
  if (body.type !== undefined) updateData.type = body.type;
  if (body.discountPct !== undefined) updateData.discountPct = body.discountPct ? parseInt(body.discountPct) : null;
  if (body.credits !== undefined) updateData.credits = body.credits ? parseInt(body.credits) : null;
  if (body.maxUses !== undefined) updateData.maxUses = body.maxUses ? parseInt(body.maxUses) : null;
  if (body.expiresAt !== undefined) updateData.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null;
  if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);

  const coupon = await prisma.couponCode.update({ where: { id: params.id }, data: updateData });
  return NextResponse.json({ coupon });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.couponCode.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
