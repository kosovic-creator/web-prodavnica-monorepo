// components/AdminLayoutContent.tsx
"use client";
import { useSession } from "next-auth/react";
import Navbar from "components/Navbar";
import React, { ReactNode } from "react";

export default function AdminLayoutContent({ children }: { children: ReactNode }) {
    const { data: session } = useSession();

    return (
        <>
            {session && <Navbar session={session} />}
            {children}
        </>
    );
}