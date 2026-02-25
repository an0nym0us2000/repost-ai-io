"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Edit2, UserCheck, UserX, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import UserEditModal from "@/components/admin/UserEditModal";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  plan: string;
  bonusCredits: number;
  isActive: boolean;
  planExpiresAt: string | null;
  createdAt: string;
  image: string | null;
  ReferralCode: { code: string; usedCount: number } | null;
  _count: { Post: number };
}

const PLAN_COLORS: Record<string, string> = {
  FREE: "bg-gray-100 text-gray-600",
  STARTER: "bg-blue-100 text-blue-600",
  PRO: "bg-purple-100 text-purple-600",
  ENTERPRISE: "bg-primary/10 text-primary",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<User | null>(null);
  const limit = 20;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, page: String(page), limit: String(limit) });
      const res = await fetch(`/api/admin/users?${params}`);
      const data = await res.json();
      setUsers(data.users || []);
      setTotal(data.total || 0);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const toggleActive = async (user: User) => {
    try {
      await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      toast.success(user.isActive ? "User deactivated" : "User activated");
      setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, isActive: !u.isActive } : u));
    } catch {
      toast.error("Failed to update user");
    }
  };

  const deleteUser = async (user: User) => {
    if (!confirm(`Delete ${user.name || user.email}? This cannot be undone.`)) return;
    try {
      await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setTotal((t) => t - 1);
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Users</h1>
        <p className="text-sm text-text-secondary">{total} total users</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card-bg">
                <th className="text-left px-4 py-3 font-medium text-text-secondary">User</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Plan</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Bonus Credits</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Posts</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Status</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Referral Code</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Joined</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center py-12 text-text-secondary">Loading...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-text-secondary">No users found</td></tr>
              ) : users.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-card-bg/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">
                          {(user.name || user.email || "?")[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-text-primary truncate">{user.name || "—"}</p>
                        <p className="text-xs text-text-secondary truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PLAN_COLORS[user.plan] || "bg-gray-100"}`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-primary font-medium">
                    {user.bonusCredits > 0 ? `+${user.bonusCredits}` : user.bonusCredits}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{user._count.Post}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.ReferralCode ? (
                      <span className="font-mono text-xs bg-card-bg px-2 py-0.5 rounded">
                        {user.ReferralCode.code} ({user.ReferralCode.usedCount})
                      </span>
                    ) : <span className="text-text-secondary">—</span>}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setEditUser(user)} className="p-1.5 hover:bg-card-bg rounded-lg transition-colors" title="Edit user">
                        <Edit2 className="w-4 h-4 text-text-secondary" />
                      </button>
                      <button onClick={() => toggleActive(user)} className="p-1.5 hover:bg-card-bg rounded-lg transition-colors" title={user.isActive ? "Deactivate" : "Activate"}>
                        {user.isActive ? <UserX className="w-4 h-4 text-orange-500" /> : <UserCheck className="w-4 h-4 text-green-600" />}
                      </button>
                      <button onClick={() => deleteUser(user)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Delete user">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-text-secondary">
              Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
            </p>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 border border-border rounded-lg text-sm disabled:opacity-40 hover:bg-card-bg transition-colors">
                Prev
              </button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 border border-border rounded-lg text-sm disabled:opacity-40 hover:bg-card-bg transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {editUser && (
        <UserEditModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSaved={(updated) => setUsers((prev) => prev.map((u) => u.id === updated.id ? { ...u, ...updated } : u))}
        />
      )}
    </div>
  );
}
