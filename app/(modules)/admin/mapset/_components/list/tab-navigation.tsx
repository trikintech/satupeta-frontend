// components/list/tab-navigation.tsx
"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/shared/utils/utils";

interface TabItem {
  id: string;
  label: string;
  filters: string[];
}

export interface TabNavigationProps {
  activeTab: string;
}

export function TabNavigation({ activeTab }: TabNavigationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs: TabItem[] = [
    {
      id: "all",
      label: "Semua",
      filters: [],
    },
    {
      id: "active",
      label: "Aktif",
      filters: ['["is_active=true"]', '["status_validation=approved"]'],
    },
    {
      id: "verification",
      label: "Verifikasi & Validasi",
      filters: [
        '["is_active=true"]',
        '["status_validation=on_verification", "status_validation=rejected"]',
      ],
    },
    {
      id: "inactive",
      label: "Non Aktif",
      filters: ['["is_active=false"]'],
    },
  ];

  const handleTabChange = useCallback(
    (tab: TabItem) => {
      const newParams = new URLSearchParams(searchParams.toString());

      // Reset pagination
      newParams.set("offset", "0");

      // Set active tab
      newParams.set("tab", tab.id);

      // Handle filters format for the backend
      if (tab.filters.length > 0) {
        newParams.delete("filter");
        const filterValue = tab.filters.toString(); // Encode untuk URL
        newParams.set("filter", "[" + filterValue + "]");
      } else {
        newParams.delete("filter");
      }
      router.push(`?${newParams.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex space-x-1 border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            "hover:text-primary focus:outline-none",
            tab.id === activeTab
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
