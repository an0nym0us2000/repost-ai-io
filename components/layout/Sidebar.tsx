"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  TrendingUp,
  Users,
  BarChart3,
  Bookmark,
  Calendar,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import Logo from "@/components/ui/Logo";

const menuItems = [
  {
    name: "Generate Post",
    href: "/generate",
    icon: Sparkles,
  },
  {
    name: "My Posts",
    href: "/my-posts",
    icon: FileText,
  },
  {
    name: "Trending",
    href: "/trending",
    icon: TrendingUp,
  },
  {
    name: "Creators",
    href: "/creators",
    icon: Users,
  },
  {
    name: "Engagement",
    href: "/engagement",
    icon: BarChart3,
  },
  {
    name: "Saved",
    href: "/saved",
    icon: Bookmark,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps = {}) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col h-full">
      {/* Logo & Close Button */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <Link href="/generate" className="flex items-center space-x-2">
          <Logo size={32} />
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
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

    </aside>
  );
}
