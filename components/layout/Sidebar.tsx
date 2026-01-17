"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  FileText,
  TrendingUp,
  Users,
  BarChart3,
  Bookmark,
  Calendar,
  Settings,
} from "lucide-react";

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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/generate" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-text-primary">Repost Ai</span>
        </Link>
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
