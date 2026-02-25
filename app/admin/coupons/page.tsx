"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Tag } from "lucide-react";
import toast from "react-hot-toast";
import CouponModal from "@/components/admin/CouponModal";

interface Coupon {
  id: string;
  code: string;
  type: "DISCOUNT" | "CREDITS";
  discountPct: number | null;
  credits: number | null;
  maxUses: number | null;
  usedCount: number;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/coupons");
      const data = await res.json();
      setCoupons(data.coupons || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCoupons(); }, []);

  const deleteCoupon = async (id: string) => {
    if (!confirm("Delete this coupon?")) return;
    try {
      await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      toast.success("Coupon deleted");
      setCoupons((prev) => prev.filter((c) => c.id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };

  const toggleActive = async (coupon: Coupon) => {
    try {
      await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      setCoupons((prev) => prev.map((c) => c.id === coupon.id ? { ...c, isActive: !c.isActive } : c));
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Coupons</h1>
          <p className="text-sm text-text-secondary">{coupons.length} total coupon codes</p>
        </div>
        <button
          onClick={() => { setEditCoupon(null); setShowModal(true); }}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Coupon
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card-bg">
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Code</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Type</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Value</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Uses</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Expires</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Status</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12 text-text-secondary">Loading...</td></tr>
              ) : coupons.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-text-secondary">No coupons yet</td></tr>
              ) : coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-border last:border-0 hover:bg-card-bg/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="font-mono font-medium text-text-primary">{coupon.code}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${coupon.type === "DISCOUNT" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                      {coupon.type === "DISCOUNT" ? "Discount" : "Credits"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-text-primary">
                    {coupon.type === "DISCOUNT" ? `${coupon.discountPct}% off` : `+${coupon.credits} credits`}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {coupon.usedCount}{coupon.maxUses ? `/${coupon.maxUses}` : ""}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : "Never"}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(coupon)}>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer ${coupon.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {coupon.isActive ? "Active" : "Inactive"}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { setEditCoupon(coupon); setShowModal(true); }} className="p-1.5 hover:bg-card-bg rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4 text-text-secondary" />
                      </button>
                      <button onClick={() => deleteCoupon(coupon.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <CouponModal
          coupon={editCoupon || undefined}
          onClose={() => { setShowModal(false); setEditCoupon(null); }}
          onSaved={fetchCoupons}
        />
      )}
    </div>
  );
}
