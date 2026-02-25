"use client";

import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  plan: string;
  bonusCredits: number;
  isActive: boolean;
  planExpiresAt: string | null;
}

interface UserEditModalProps {
  user: User;
  onClose: () => void;
  onSaved: (updated: User) => void;
}

const PLANS = ["FREE", "STARTER", "PRO", "ENTERPRISE"];

export default function UserEditModal({ user, onClose, onSaved }: UserEditModalProps) {
  const [plan, setPlan] = useState(user.plan);
  const [bonusCredits, setBonusCredits] = useState(user.bonusCredits);
  const [isActive, setIsActive] = useState(user.isActive);
  const [planExpiresAt, setPlanExpiresAt] = useState(
    user.planExpiresAt ? new Date(user.planExpiresAt).toISOString().split("T")[0] : ""
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, bonusCredits, isActive, planExpiresAt: planExpiresAt || null }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const { user: updated } = await res.json();
      toast.success("User updated");
      onSaved(updated);
      onClose();
    } catch {
      toast.error("Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-semibold text-text-primary text-lg">Edit User</h2>
            <p className="text-sm text-text-secondary">{user.name || user.email}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-card-bg rounded-lg transition-colors">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Plan */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Plan</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {PLANS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Bonus Credits */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Bonus Credits
            </label>
            <p className="text-xs text-text-secondary mb-2">
              Extra AI generations on top of plan limit. Use negative to reduce.
            </p>
            <input
              type="number"
              value={bonusCredits}
              onChange={(e) => setBonusCredits(parseInt(e.target.value) || 0)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Plan Expires At */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Plan Validity (expires at)
            </label>
            <p className="text-xs text-text-secondary mb-2">Leave empty for no expiry override.</p>
            <input
              type="date"
              value={planExpiresAt}
              onChange={(e) => setPlanExpiresAt(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Account Active</p>
              <p className="text-xs text-text-secondary">Inactive users cannot generate posts</p>
            </div>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isActive ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  isActive ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border rounded-lg text-sm text-text-secondary hover:bg-card-bg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
