"use client";

import { SessionProvider, useSession } from "next-auth/react";
import Navbar from "components/Navbar";
import React, { ReactNode } from "react";

function AdminLayoutContent({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const { data: session } = useSession();

    return (
        <>
            {session && <Navbar session={session} />}
            {children}
        </>
    );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </SessionProvider>
    );
}

// apps/admin/app/page.tsx ili neki child layout
export function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* ... */}
    </div>
  );
}
