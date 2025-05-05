import React from "react";
import Sidebar from "./components/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen p-4 space-x-4 overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 rounded-lg border border-zinc-200">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
