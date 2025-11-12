'use client';
import "./globals.css";
import React, { ReactNode } from "react";
import ClientLayout from "@/components/ClientLayout";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
