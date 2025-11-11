import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
