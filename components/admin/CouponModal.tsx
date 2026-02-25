"use client";

import { useState } from "react";
import { X, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface Coupon {
  id?: string;
  code: string;
  type: "DISCOUNT" | "CREDITS";
  discountPct: number | null;
  credits: number | null;
  maxUses: number | null;
  expiresAt: string | null;
  isActive: boolean;
}

interface CouponModalProps {
  coupon?: Coupon;
  onClose: () => void;
  onSaved: () => void;
}

function randomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function CouponModal({ coupon, onClose, onSaved }: CouponModalProps) {
  const isEdit = !!coupon?.id;
  const [code, setCode] = useState(coupon?.code || randomCode());
  const [type, setType] = useState<"DISCOUNT" | "CREDITS">(coupon?.type || "DISCOUNT");
  const [discountPct, setDiscountPct] = useState(coupon?.discountPct?.toString() || "");
  const [credits, setCredits] = useState(coupon?.credits?.toString() || "");
  const [maxUses, setMaxUses] = useState(coupon?.maxUses?.toString() || "");
  const [expiresAt, setExpiresAt] = useState(
    coupon?.expiresAt ? new Date(coupon.expiresAt).toISOString().split("T")[0] : ""
  );
  const [isActive, setIsActive] = useState(coupon?.isActive !== false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!code.trim()) return toast.error("Code is required");
    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/coupons/${coupon!.id}` : "/api/admin/coupons";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          type,
          discountPct: type === "DISCOUNT" ? discountPct : null,
          credits: type === "CREDITS" ? credits : null,
          maxUses: maxUses || null,
          expiresAt: expiresAt || null,
          isActive,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed");
      }
      toast.success(isEdit ? "Coupon updated" : "Coupon created");
      onSaved();
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save coupon");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-semibold text-text-primary text-lg">
            {isEdit ? "Edit Coupon" : "New Coupon"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-card-bg rounded-lg transition-colors">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Code</label>
            <div className="flex gap-2">
              <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="flex-1 border border-border rounded-lg px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="MYCODE10" />
              <button onClick={() => setCode(randomCode())} className="px-3 py-2 border border-border rounded-lg hover:bg-card-bg transition-colors" title="Generate random code">
                <RefreshCw className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Type</label>
            <div className="flex gap-3">
              {(["DISCOUNT", "CREDITS"] as const).map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${type === t ? "border-primary bg-primary/10 text-primary" : "border-border text-text-secondary hover:bg-card-bg"}`}>
                  {t === "DISCOUNT" ? "Discount %" : "Free Credits"}
                </button>
              ))}
            </div>
          </div>
          {type === "DISCOUNT" ? (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Discount % (1-100)</label>
              <input type="number" min={1} max={100} value={discountPct} onChange={(e) => setDiscountPct(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="20" />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Credits to Grant</label>
              <input type="number" min={1} value={credits} onChange={(e) => setCredits(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="10" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Max Uses</label>
            <p className="text-xs text-text-secondary mb-2">Leave empty for unlimited</p>
            <input type="number" min={1} value={maxUses} onChange={(e) => setMaxUses(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Unlimited" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Expires At</label>
            <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-primary">Active</p>
            <button onClick={() => setIsActive(!isActive)}
              className={`relative w-12 h-6 rounded-full transition-colors ${isActive ? "bg-primary" : "bg-gray-300"}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isActive ? "translate-x-7" : "translate-x-1"}`} />
            </button>
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-border">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-border rounded-lg text-sm text-text-secondary hover:bg-card-bg transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
            {saving ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
