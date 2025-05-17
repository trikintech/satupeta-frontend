"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/shared/utils/utils";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

  const roleName = session?.user?.role?.name;
  const organizationId = session?.user?.organization?.id;
  const shouldAddProducerFilter =
    roleName === "data_viewer" || roleName === "data_manager";

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

      // Inject filter
      newParams.delete("filter");

      const combinedFilters = [...tab.filters];

      if (shouldAddProducerFilter && organizationId) {
        combinedFilters.push(`["producer_id=${organizationId}"]`);
      }

      if (combinedFilters.length > 0) {
        const filterValue = combinedFilters.toString();
        newParams.set("filter", `[${filterValue}]`);
      }

      router.push(`?${newParams.toString()}`);
    },
    [organizationId, router, searchParams, shouldAddProducerFilter]
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
