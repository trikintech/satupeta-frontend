"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  LogOut,
  ChevronsRight,
  ChevronsLeft,
  Map,
  FileText,
  UserCog,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { cn } from "@/shared/utils/utils";
import Image from "next/image";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    name: "Manajemen Peta",
    href: "/admin/mapset",
    icon: <Map className="h-5 w-5" />,
  },
  {
    name: "Manajemen User",
    href: "/admin/user",
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: "Manajemen Konten",
    href: "/admin/news",
    icon: <FileText className="h-5 w-5" />,
  },
];

const settingsItems: MenuItem[] = [
  // {
  //   name: "Mapserver & Metadata",
  //   href: "/admin/map-sources",
  //   icon: <UserCog className="h-5 w-5" />,
  // },
  {
    name: "Perangkat Daerah",
    href: "/admin/organization",
    icon: <UserCog className="h-5 w-5" />,
  },
  {
    name: "Kategori",
    href: "/admin/category",
    icon: <UserCog className="h-5 w-5" />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Check if current path is active (exact match or starts with path for nested routes)
  const isActive = useCallback(
    (href: string) => {
      // Exact match for main routes
      if (pathname === href) return true;

      // For nested routes, check if the current pathname starts with the href
      if (href !== "/" && pathname.startsWith(href)) {
        // Don't match partial segments - ensure we're matching complete path segments
        const nextChar = pathname.charAt(href.length);
        return nextChar === "" || nextChar === "/";
      }

      return false;
    },
    [pathname]
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
          <>
            <Image
              src={"/admin-logo.png"}
              alt="admin-logo"
              width={32}
              height={32}
            />
            <div className="flex-1">
              <div className="font-semibold text-sm">Satu Peta</div>
              <div className="text-xs text-gray-500">Walidata</div>
            </div>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-2 py-2">
          {/* Features Section */}
          {!collapsed && (
            <p className="text-xs text-gray-500 font-medium px-2 mb-2">
              FEATURES
            </p>
          )}
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} passHref>
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg transition-colors",
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
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

          {/* Settings Section */}
          {!collapsed && (
            <p className="text-xs text-gray-500 font-medium px-2 mt-6 mb-2">
              SETTINGS
            </p>
          )}
          <ul className="space-y-1">
            {settingsItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} passHref>
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg transition-colors",
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
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

      {/* User profile dan logout */}
      <div className="p-2 border-t border-gray-200">
        <div className="flex items-center px-2 py-3">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            <span className="text-sm font-medium">A</span>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-500">a@example.com</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center justify-start text-gray-600 hover:bg-gray-200 mt-1",
            collapsed ? "justify-center px-2" : "justify-start"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3 text-sm">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
