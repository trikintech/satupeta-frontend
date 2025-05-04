import React, { useState, useEffect } from "react";
import { Layers } from "lucide-react";
import SearchInput from "@/shared/components/search-input";
import { useQueryParam, StringParam } from "use-query-params";
import GroupMapset from "./group-mapset";
import { useQuery } from "@tanstack/react-query";
import organizationApi from "@/shared/services/organization";

const MapsetList: React.FC = () => {
  const [query] = useQueryParam("query", StringParam);
  const [searchTerm, setSearchTerm] = useState(query || "");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const { data: organizations, isLoading } = useQuery({
    queryKey: ["organizations"],
    queryFn: () =>
      organizationApi.getOrganizations().then((res) => {
        return res.items;
      }),
  });

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
          <p className="mt-4 text-gray-500">Loading organizations...</p>
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

      {organizations?.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
          <Layers size={48} className="mb-2 opacity-50" />
          <p>No layers found matching &quot;{debouncedSearchTerm}&quot;</p>
        </div>
      ) : (
        <div className="overflow-y-auto pr-1 flex flex-col space-y-2">
          {organizations?.map((organization) => (
            <GroupMapset
              organization={organization}
              key={organization.id}
              search={debouncedSearchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MapsetList;
