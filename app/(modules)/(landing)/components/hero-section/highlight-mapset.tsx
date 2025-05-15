"use client";

import { useQuery } from "@tanstack/react-query";
import { MapsetCard } from "../mapset-card";
import mapsetApi from "@/shared/services/mapset";

export default function HighlightMapset() {
  const { data: mapsets, isLoading } = useQuery({
    queryKey: ["mapsets-highlight"],
    queryFn: () =>
      mapsetApi
        .getMapsets({
          limit: 3,
          filter: ["is_active=true", "status_validation=approved"],
        })
        .then((res) => {
          return res.items;
        }),
    staleTime: 5000,
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-9 mt-20">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!mapsets || mapsets.length === 0) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-9 mt-20">
      {mapsets.slice(0, 3).map((mapset) => (
        <div key={mapset.id}>
          <MapsetCard mapset={mapset} />
        </div>
      ))}
    </div>
  );
}
