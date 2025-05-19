"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  LogOut,
  ChevronsRight,
  ChevronsLeft,
  FileText,
  UserCog,
  Key,
  ChartBarIncreasing,
  BookOpen,
  WashingMachine,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { cn } from "@/shared/utils/utils";
import Image from "next/image";
import { useAuthSession } from "@/shared/hooks/use-session";
import { getRoleLabelById, hasPermission } from "@/shared/config/role";
import { handleLogout } from "@/shared/hooks/use-auth-api";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  module: string; // default ke 'read' jika tidak diisi
}

const menuItems: MenuItem[] = [
  {
    name: "Manajemen Peta",
    href: "/admin/mapset",
    module: "mapset",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    name: "Manajemen User",
    href: "/admin/user",
    icon: <Users className="h-5 w-5" />,
    module: "user",
  },
  {
    name: "Manajemen Konten",
    href: "/admin/news",
    icon: <FileText className="h-5 w-5" />,
    module: "news",
  },
];

const settingsItems: MenuItem[] = [
  {
    name: "Perangkat Daerah",
    href: "/admin/organization",
    icon: <UserCog className="h-5 w-5" />,
    module: "organization",
  },
  {
    name: "Kategori",
    href: "/admin/category",
    icon: <ChartBarIncreasing className="h-5 w-5" />,
    module: "category",
  },
  {
    name: "Mapserver & Metadata",
    href: "/admin/map-source",
    icon: <WashingMachine className="h-5 w-5" />,
    module: "map-source",
  },
  {
    name: "Kredensial",
    href: "/admin/credential",
    icon: <Key className="h-5 w-5" />,
    module: "credential",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { session } = useAuthSession();
  const userRole = session?.user?.role;

  const isActive = useCallback(
    (href: string) => {
      if (pathname === href) return true;
      if (href !== "/" && pathname.startsWith(href)) {
        const nextChar = pathname.charAt(href.length);
        return nextChar === "" || nextChar === "/";
      }
      return false;
    },
    [pathname]
  );
  const filteredMenuItems = menuItems.filter(
    (item) => userRole && hasPermission(userRole, item.module, "read")
  );

  const filteredSettingsItems = settingsItems.filter(
    (item) => userRole && hasPermission(userRole, item.module, "read")
  );

  return (
    <div
      className={cn(
        "relative flex flex-col h-full bg-zinc-50 border text-zinc-700 border-zinc-200 transition-all rounded-lg duration-300",
        collapsed ? "w-16" : "p-2 w-64"
      )}
    >
      <div
        className={`flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        } h-16 p-2 space-x-2`}
      >
        {!collapsed && (
          <div>
            <Image
              src={"/logo.svg"}
              alt="admin-logo"
              width={140}
              height={120}
            />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer"
        >
          {collapsed ? (
            <ChevronsRight className="h-5 w-5" strokeWidth="1" />
          ) : (
            <ChevronsLeft className="h-5 w-5" strokeWidth="1" />
          )}
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-2 py-2">
          {/* Features Section */}
          {filteredMenuItems.length > 0 && !collapsed && (
            <p className="text-xs text-zinc-700 font-medium px-2 mb-2">
              Features
            </p>
          )}
          <ul className="space-y-1">
            {filteredMenuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} passHref>
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg transition-colors",
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-zinc-700 hover:bg-zinc-100"
                    )}
                  >
                    <span
                      className={cn(
                        "flex-shrink-0 text-gray-500",
                        isActive(item.href) && "text-blue-600"
                      )}
                    >
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className="ml-3 text-sm">{item.name}</span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {filteredSettingsItems.length > 0 && !collapsed && (
            <p className="text-xs text-zinc-700 font-medium px-2 mt-6 mb-2">
              Settings
            </p>
          )}
          <ul className="space-y-1">
            {filteredSettingsItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} passHref>
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg transition-colors",
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-zinc-700 hover:bg-zinc-100"
                    )}
                  >
                    <span
                      className={cn(
                        "flex-shrink-0 text-gray-500",
                        isActive(item.href) && "text-blue-600"
                      )}
                    >
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className="ml-3 text-sm">{item.name}</span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>

      <div className="p-2 border-t border-zinc-200">
        <div className="flex items-center px-2 py-3">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-zinc-700">
            <span className="text-sm font-medium">
              {session?.user?.name?.[0] ?? "U"}
            </span>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <div className="text-xs text-gray-500">
                {getRoleLabelById(userRole.name ?? "")}
              </div>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center justify-start text-zinc-700 hover:bg-gray-200 mt-1",
            collapsed ? "justify-center px-2" : "justify-start"
          )}
          onClick={() => handleLogout()}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3 text-sm">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
