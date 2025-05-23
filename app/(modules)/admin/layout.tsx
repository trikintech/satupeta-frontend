import React from "react";
import Sidebar from "./_components/sidebar";
import AdminRouteGuard from "@/shared/components/auth/admin-route-guard";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <AdminRouteGuard>
      <div className="flex h-screen p-4 space-x-4 overflow-hidden">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto rounded-lg border border-zinc-200 relative pb-6">
            {children}
          </main>
        </div>
      </div>
    </AdminRouteGuard>
  );
};

export default AdminLayout;
