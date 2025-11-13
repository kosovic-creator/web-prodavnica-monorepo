import AdminLayout from "components/AdminLayout";
import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sr">
      <body>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
