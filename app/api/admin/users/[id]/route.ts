import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const body = await req.json();

  const updateData: Record<string, unknown> = {};
  if (body.plan !== undefined) updateData.plan = body.plan;
  if (body.bonusCredits !== undefined) updateData.bonusCredits = parseInt(body.bonusCredits);
  if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);
  if (body.planExpiresAt !== undefined) updateData.planExpiresAt = body.planExpiresAt ? new Date(body.planExpiresAt) : null;
  if (body.name !== undefined) updateData.name = body.name;
  if (body.email !== undefined) updateData.email = body.email;

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: { id: true, name: true, email: true, plan: true, bonusCredits: true, isActive: true, planExpiresAt: true },
  });

  return NextResponse.json({ user });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
