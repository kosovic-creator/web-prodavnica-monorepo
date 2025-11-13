import AdminLayout from "components/AdminLayout";
import "./globals.css";
import { MetadataBoundary } from "next/dist/lib/framework/boundary-components";


export const metadata = {
  title: 'Admin Panel - Web Trgovina',
  description: 'Administracija prodavnice Web Trgovina',
};

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