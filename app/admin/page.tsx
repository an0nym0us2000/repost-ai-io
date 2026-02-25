"use client";

import { useEffect, useState } from "react";
import { Users, UserCheck, FileText, Tag, Share2, TrendingUp, BarChart2, ExternalLink } from "lucide-react";

interface Stats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  planBreakdown: Record<string, number>;
  totalPosts: number;
  activeCoupons: number;
  totalReferrals: number;
  recentUsers: Array<{ id: string; name: string | null; email: string | null; plan: string; createdAt: string }>;
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number | string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="text-sm text-text-secondary mt-1">{label}</p>
    </div>
  );
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const PLAN_COLORS: Record<string, string> = {
  FREE: "bg-gray-100 text-gray-600",
  STARTER: "bg-blue-100 text-blue-600",
  PRO: "bg-purple-100 text-purple-600",
  ENTERPRISE: "bg-primary/10 text-primary",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) return <p className="text-text-secondary">Failed to load stats.</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-1">Overview of your platform</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value={stats.totalUsers} color="bg-blue-100 text-blue-600" />
        <StatCard icon={UserCheck} label="Active Users" value={stats.activeUsers} color="bg-primary/10 text-primary" />
        <StatCard icon={FileText} label="Total Posts" value={stats.totalPosts} color="bg-purple-100 text-purple-600" />
        <StatCard icon={Tag} label="Active Coupons" value={stats.activeCoupons} color="bg-orange-100 text-orange-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Plan Breakdown */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-text-primary">Plan Distribution</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(stats.planBreakdown).map(([plan, count]) => {
              const pct = stats.totalUsers ? Math.round((count / stats.totalUsers) * 100) : 0;
              return (
                <div key={plan}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PLAN_COLORS[plan] || "bg-gray-100 text-gray-600"}`}>{plan}</span>
                    <span className="text-text-secondary">{count} users ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <Share2 className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-text-primary">Recent Signups</h2>
          </div>
          <div className="space-y-3">
            {stats.recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{user.name || "—"}</p>
                  <p className="text-xs text-text-secondary truncate">{user.email}</p>
                </div>
                <span className={`ml-3 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${PLAN_COLORS[user.plan] || "bg-gray-100"}`}>
                  {user.plan}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Analytics */}
      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-text-primary">Google Analytics</h2>
          </div>
          {GA_ID && (
            <a
              href={`https://analytics.google.com/analytics/web/#/p${GA_ID.replace("G-", "")}/reports/intelligenthome`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
            >
              Open GA4 Dashboard
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {GA_ID ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-text-secondary">
                Tracking active — Measurement ID: <span className="font-mono font-medium text-text-primary">{GA_ID}</span>
              </span>
            </div>
            <p className="text-sm text-text-secondary">
              GA4 is collecting data on all pages. Use the GA4 dashboard to view real-time visitors, traffic sources, page views, conversions, and user behaviour.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { label: "Real-time", href: `https://analytics.google.com/analytics/web/#/p${GA_ID.replace("G-", "")}/reports/realtime` },
                { label: "Acquisition", href: `https://analytics.google.com/analytics/web/#/p${GA_ID.replace("G-", "")}/reports/acquisition-overview` },
                { label: "Engagement", href: `https://analytics.google.com/analytics/web/#/p${GA_ID.replace("G-", "")}/reports/engagement-overview` },
                { label: "Retention", href: `https://analytics.google.com/analytics/web/#/p${GA_ID.replace("G-", "")}/reports/retention` },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border border-border text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors"
                >
                  {label}
                  <ExternalLink className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">Google Analytics not configured</p>
              <p className="text-sm text-amber-700 mt-0.5">
                Set <code className="font-mono bg-amber-100 px-1 rounded">NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX</code> in your environment variables to enable tracking.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
