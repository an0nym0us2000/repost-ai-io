import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [
    totalUsers,
    activeUsers,
    planBreakdown,
    totalPosts,
    activeCoupons,
    totalReferrals,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isActive: true } }),
    prisma.user.groupBy({ by: ['plan'], _count: { plan: true } }),
    prisma.post.count(),
    prisma.couponCode.count({ where: { isActive: true } }),
    prisma.referral.count(),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, name: true, email: true, plan: true, createdAt: true },
    }),
  ]);

  const planMap: Record<string, number> = { FREE: 0, STARTER: 0, PRO: 0, ENTERPRISE: 0 };
  planBreakdown.forEach((p) => { planMap[p.plan] = p._count.plan; });

  return NextResponse.json({
    totalUsers,
    activeUsers,
    inactiveUsers: totalUsers - activeUsers,
    planBreakdown: planMap,
    totalPosts,
    activeCoupons,
    totalReferrals,
    recentUsers,
  });
}
