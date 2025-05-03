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

  const organizations = useQuery({
    queryKey: ["organizations"],
    queryFn: () =>
      organizationApi.getOrganizations().then((res) => {
        return res.items;
      }),
  });

  useEffect(() => {
    setSearchTerm(query || "");
  }, [query]);

  const handleSearch = () => {};

  return (
    <div className="p-4 h-full flex flex-col max-w-xl mx-auto rounded-l-lg">
      <div className="mb-4">
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Cari dataset"
        />
      </div>

      {organizations.data?.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
          <Layers size={48} className="mb-2 opacity-50" />
          <p>No layers found matching &quot;{searchTerm}&quot;</p>
        </div>
      ) : (
        <div className="overflow-y-auto pr-1 flex flex-col space-y-2">
          {organizations.data?.map((organization) => (
            <GroupMapset organization={organization} key={organization.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MapsetList;
