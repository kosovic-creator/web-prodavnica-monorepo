"use client";
import { KorpaProvider } from "@/components/KorpaContext";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <KorpaProvider>
        <Navbar />
        {children}
      </KorpaProvider>
    </SessionProvider>
  );
}
