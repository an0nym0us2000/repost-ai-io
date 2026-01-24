"use client";

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
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-y-auto bg-background p-6">
                    {children}
                </main>
            </div>
            <UpcomingPostsReminder />
        </div>
    );
}
