import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
