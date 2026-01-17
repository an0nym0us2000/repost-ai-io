"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { Bell, Moon, Sun, User, LogOut, X } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Initialize dark mode from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const userName = session?.user?.name || "Guest";
  const userImage = session?.user?.image;
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-border dark:border-gray-700 px-6 py-4 transition-colors">
      <div className="flex items-center justify-end">
        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl hover:bg-card-bg dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-text-secondary" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl hover:bg-card-bg dark:hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-text-secondary dark:text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-border dark:border-gray-700 overflow-hidden z-50 animate-fade-in">
                <div className="flex items-center justify-between p-4 border-b border-border dark:border-gray-700">
                  <h3 className="font-semibold text-text-primary dark:text-gray-100">Notifications</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-text-secondary dark:text-gray-400" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-sm text-text-secondary dark:text-gray-400">
                      No new notifications
                    </p>
                    <p className="text-xs text-text-secondary dark:text-gray-500 mt-1">
                      We&apos;ll notify you when something arrives
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 pl-3 rounded-xl hover:bg-card-bg dark:hover:bg-gray-800 transition-colors"
              aria-label="User menu"
            >
              <span className="text-sm font-medium text-text-primary dark:text-gray-100 hidden sm:block">
                {userName}
              </span>
              {userImage ? (
                <img
                  src={userImage}
                  alt={userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">{userInitials}</span>
                </div>
              )}
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-border dark:border-gray-700 py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-border dark:border-gray-700">
                  <p className="text-sm font-medium text-text-primary dark:text-gray-100">{userName}</p>
                  <p className="text-xs text-text-secondary dark:text-gray-400">{session?.user?.email}</p>
                </div>
                <Link
                  href="/settings"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary dark:text-gray-300 hover:bg-card-bg dark:hover:bg-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Profile Settings</span>
                </Link>
                {session ? (
                  <button
                    onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-red-500 hover:bg-card-bg dark:hover:bg-gray-700 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-primary hover:bg-card-bg dark:hover:bg-gray-700"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
