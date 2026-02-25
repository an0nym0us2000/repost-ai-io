"use client";

import { useEffect, useState } from "react";
import { Share2, Save, X } from "lucide-react";
import toast from "react-hot-toast";

interface ReferralCode {
  id: string;
  code: string;
  discountPct: number;
  rewardCredits: number;
  usedCount: number;
  isActive: boolean;
  createdAt: string;
  User: { name: string | null; email: string | null };
  _count: { Referrals: number };
}

export default function AdminReferralsPage() {
  const [referrals, setReferrals] = useState<ReferralCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ discountPct: 0, rewardCredits: 0, code: "" });

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/referrals");
      const data = await res.json();
      setReferrals(data.referralCodes || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReferrals(); }, []);

  const startEdit = (r: ReferralCode) => {
    setEditId(r.id);
    setEditValues({ discountPct: r.discountPct, rewardCredits: r.rewardCredits, code: r.code });
  };

  const saveEdit = async (id: string) => {
    try {
      await fetch(`/api/admin/referrals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValues),
      });
      toast.success("Referral code updated");
      setEditId(null);
      fetchReferrals();
    } catch {
      toast.error("Failed to update");
    }
  };

  const toggleActive = async (r: ReferralCode) => {
    try {
      await fetch(`/api/admin/referrals/${r.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !r.isActive }),
      });
      setReferrals((prev) => prev.map((rc) => rc.id === r.id ? { ...rc, isActive: !rc.isActive } : rc));
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Referral Codes</h1>
        <p className="text-sm text-text-secondary">{referrals.length} referral codes</p>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card-bg">
                <th className="text-left px-4 py-3 font-medium text-text-secondary">User</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Code</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Signup Discount</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Reward Credits</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Referrals</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Status</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12 text-text-secondary">Loading...</td></tr>
              ) : referrals.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-text-secondary">No referral codes yet</td></tr>
              ) : referrals.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-card-bg/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-text-primary">{r.User.name || "—"}</p>
                    <p className="text-xs text-text-secondary">{r.User.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    {editId === r.id ? (
                      <input value={editValues.code} onChange={(e) => setEditValues(v => ({ ...v, code: e.target.value.toUpperCase() }))}
                        className="font-mono border border-border rounded px-2 py-1 text-sm w-28 focus:outline-none focus:ring-1 focus:ring-primary" />
                    ) : (
                      <span className="font-mono bg-card-bg px-2 py-0.5 rounded text-xs">{r.code}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editId === r.id ? (
                      <div className="flex items-center gap-1">
                        <input type="number" min={0} max={100} value={editValues.discountPct}
                          onChange={(e) => setEditValues(v => ({ ...v, discountPct: parseInt(e.target.value) || 0 }))}
                          className="border border-border rounded px-2 py-1 text-sm w-16 focus:outline-none focus:ring-1 focus:ring-primary" />
                        <span className="text-text-secondary">%</span>
                      </div>
                    ) : `${r.discountPct}% off`}
                  </td>
                  <td className="px-4 py-3">
                    {editId === r.id ? (
                      <input type="number" min={0} value={editValues.rewardCredits}
                        onChange={(e) => setEditValues(v => ({ ...v, rewardCredits: parseInt(e.target.value) || 0 }))}
                        className="border border-border rounded px-2 py-1 text-sm w-16 focus:outline-none focus:ring-1 focus:ring-primary" />
                    ) : `+${r.rewardCredits} credits`}
                  </td>
                  <td className="px-4 py-3 text-text-secondary font-medium">{r._count.Referrals}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(r)}>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer ${r.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {r.isActive ? "Active" : "Inactive"}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {editId === r.id ? (
                        <>
                          <button onClick={() => saveEdit(r.id)} className="p-1.5 hover:bg-green-50 rounded-lg transition-colors" title="Save">
                            <Save className="w-4 h-4 text-green-600" />
                          </button>
                          <button onClick={() => setEditId(null)} className="p-1.5 hover:bg-card-bg rounded-lg transition-colors" title="Cancel">
                            <X className="w-4 h-4 text-text-secondary" />
                          </button>
                        </>
                      ) : (
                        <button onClick={() => startEdit(r)} className="p-1.5 hover:bg-card-bg rounded-lg transition-colors" title="Edit">
                          <Share2 className="w-4 h-4 text-text-secondary" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
