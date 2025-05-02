"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { cn } from "@/shared/utils/utils";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative flex flex-col h-full bg-gray-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo area */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
        {!collapsed && <div className="font-bold text-xl">Admin Panel</div>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Navigation menu */}
      <ScrollArea className="flex-1">
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} passHref>
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg transition-colors",
                      pathname === item.href
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    )}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && <span className="ml-3">{item.name}</span>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>

      {/* Logout button */}
      <div className="p-2 border-t border-gray-800">
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center justify-start text-gray-400 hover:text-white hover:bg-gray-800",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
