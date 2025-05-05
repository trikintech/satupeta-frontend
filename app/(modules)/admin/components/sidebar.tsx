"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Users,
  LogOut,
  ChevronsRight,
  ChevronsLeft,
  Map,
  FileText,
  ChevronDown,
  ChevronRight,
  UserCog,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { cn } from "@/shared/utils/utils";
import Image from "next/image";

const menuItems = [
  {
    name: "Manajemen Peta",
    href: "/maps",
    icon: <Map className="h-5 w-5" />,
    hasSubMenu: false,
  },
  {
    name: "Manajemen User",
    href: "/user",
    icon: <Users className="h-5 w-5" />,
    hasSubMenu: false,
  },
  {
    name: "Manajemen Konten",
    href: "/news",
    icon: <FileText className="h-5 w-5" />,
    hasSubMenu: false,
  },
];

const settingsItems = [
  {
    name: "Mapserver & Metadata",
    href: "/settings/map-source",
    icon: <UserCog className="h-5 w-5" />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (menuName: string) => {
    if (collapsed) {
      setCollapsed(false);
      setOpenSubMenus({ [menuName]: true });
    } else {
      setOpenSubMenus((prev) => ({
        ...prev,
        [menuName]: !prev[menuName],
      }));
    }
  };

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
                {item.hasSubMenu ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => toggleSubMenu(item.name)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors",
                        openSubMenus[item.name]
                          ? "bg-gray-200"
                          : "hover:bg-gray-200"
                      )}
                    >
                      <div className="flex items-center">
                        <span className="text-gray-500">{item.icon}</span>
                        {!collapsed && (
                          <span className="ml-3 text-sm">{item.name}</span>
                        )}
                      </div>
                      {!collapsed &&
                        (openSubMenus[item.name] ? (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        ))}
                    </button>
                  </div>
                ) : (
                  <Link href={item.href} passHref>
                    <div
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg transition-colors",
                        pathname === item.href
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      <span className="flex-shrink-0 text-gray-500">
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span className="ml-3 text-sm">{item.name}</span>
                      )}
                    </div>
                  </Link>
                )}
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
                      pathname === item.href
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <span className="flex-shrink-0 text-gray-500">
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
