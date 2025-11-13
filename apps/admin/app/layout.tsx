import AdminLayout from "components/AdminLayout";
import "./globals.css";
// apps/admin/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>
        <AdminLayout>
        {children}
        </AdminLayout>
      </body>
    </html>
  );
}