'use client';
import "./globals.css";
import React, { ReactNode } from "react";
import { KorpaProvider } from "@/components/KorpaContext";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <KorpaProvider>
            <Navbar />
            {children}
          </KorpaProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
