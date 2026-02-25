"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Tag, Share2, ShieldCheck } from "lucide-react";
import Logo from "@/components/ui/Logo";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Coupons", href: "/admin/coupons", icon: Tag },
  { name: "Referrals", href: "/admin/referrals", icon: Share2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col h-full">
      <div className="p-6 border-b border-border flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
        <div>
          <Link href="/admin" className="flex items-center gap-2">
            <Logo size={24} />
          </Link>
          <p className="text-xs text-text-secondary mt-0.5 font-medium">Super Admin</p>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-text-secondary hover:bg-card-bg hover:text-text-primary"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-text-secondary hover:text-primary transition-colors px-4 py-2"
        >
          ← Back to App
        </Link>
      </div>
    </aside>
  );
}
