import React, { useState, useEffect } from "react";
import { Layers } from "lucide-react";
import SearchInput from "@/shared/components/search-input";
import { useQueryParam, StringParam } from "use-query-params";
import GroupMapset from "./group-mapset";
import { useQuery } from "@tanstack/react-query";
import organizationApi from "@/shared/services/organization";
import categoryApi from "@/shared/services/category"; // Add this import
import { useAtom } from "jotai";
import { activeTabAtom } from "../../../state/active-tab";

const MapsetList: React.FC = () => {
  const [query] = useQueryParam("query", StringParam);
  const [searchTerm, setSearchTerm] = useState(query || "");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [activeTab] = useAtom(activeTabAtom);

  const { data: organizations, isLoading: isLoadingOrganizations } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => organizationApi.getOrganizations().then((res) => res.items),
    enabled: activeTab === "organization",
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getCategories().then((res) => res.items),
    enabled: activeTab === "category",
  });

  const isLoading =
    activeTab === "organization" ? isLoadingOrganizations : isLoadingCategories;
  const items = activeTab === "organization" ? organizations : categories;

  useEffect(() => {
    setSearchTerm(query || "");
  }, [query]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  if (isLoading) {
    return (
      <div className="p-4 h-full flex flex-col max-w-xl mx-auto rounded-l-lg">
        <div className="mb-4">
          <SearchInput
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Cari dataset"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-500">
            Loading{" "}
            {activeTab === "organization" ? "organizations" : "categories"}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col max-w-xl mx-auto rounded-l-lg">
      <div className="mb-4">
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Cari dataset"
        />
      </div>

      {items?.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
          <Layers size={48} className="mb-2 opacity-50" />
          <p>No layers found matching &quot;{debouncedSearchTerm}&quot;</p>
        </div>
      ) : (
        <div className="overflow-y-auto pr-1 flex flex-col space-y-2">
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            items?.map((item: any) => (
              <GroupMapset
                key={item.id}
                item={item}
                type={activeTab}
                search={debouncedSearchTerm}
              />
            ))
          }
        </div>
      )}
    </div>
  );
};

export default MapsetList;
