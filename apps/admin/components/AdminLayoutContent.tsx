// components/AdminLayoutContent.tsx
"use client";
import { useSession } from "next-auth/react";

import React, { ReactNode } from "react";
import NavbarAdmin from "./NavbarAdmin";

export default function AdminLayoutContent({ children }: { children: ReactNode }) {
    const { data: session } = useSession();

    return (
        <>
            {session && <NavbarAdmin session={session} />}
            {children}
        </>
    );
}