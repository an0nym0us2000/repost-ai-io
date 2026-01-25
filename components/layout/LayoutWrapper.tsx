"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import UpcomingPostsReminder from "@/components/calendar/UpcomingPostsReminder";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Don't show sidebar/topbar on landing page, auth pages, and public info pages
    const publicRoutes = [
        "/",
        "/auth",
        "/pricing",
        "/features",
        "/about",
        "/contact",
        "/support",
        "/privacy",
        "/terms",
        "/security",
        "/cookies",
    ];

    const isPublicPage = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + "/")
    );

    if (isPublicPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar Drawer */}
            <div
                className={`fixed top-0 left-0 z-50 h-full bg-white transition-transform duration-300 lg:hidden ${
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6">
                    {children}
                </main>
            </div>
            <UpcomingPostsReminder />
        </div>
    );
}
