"use client";
import { KorpaProvider } from "@/components/KorpaContext";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <SessionProvider>
      <KorpaProvider>
              <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <Navbar setSidebarOpen={setSidebarOpen} />
        {children}
      </KorpaProvider>
    </SessionProvider>
  );
}
