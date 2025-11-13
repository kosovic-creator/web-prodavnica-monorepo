"use client";

import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import AdminNavbar from "./NavbarAdmin";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </SessionProvider>
    );
}

function AdminLayoutContent({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  return (
      <>
        {session && <AdminNavbar session={session} />}
        {children}
      </>
    );
}
