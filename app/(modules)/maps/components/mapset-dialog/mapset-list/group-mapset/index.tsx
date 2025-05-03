/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { Organization } from "@/shared/types/organization";
import { useQuery } from "@tanstack/react-query";
import mapsetApi from "@/shared/services/mapset";
import { selectedMapsetAtom } from "../../../../state/mapset-dialog";
import { useAtom } from "jotai";
import { Mapset } from "@/shared/types/mapset";
import MapsetItem from "./mapset-item";

export default function GroupMapset({
  organization,
}: {
  organization: Organization;
}) {
  const [open, setOpen] = useState(false);
  const filters = { filter: [`producer_id=${organization.id}`] };
  const [selectedMapset, setSelectedMapset] = useAtom(selectedMapsetAtom);

  const mapsets = useQuery({
    queryKey: ["mapsets", organization.id],
    queryFn: () =>
      mapsetApi.getMapsets(filters).then((res) => {
        return res.items;
      }),
  });

  const handleAddLayer = useCallback((mapset: Mapset) => {
    setSelectedMapset(mapset);
  }, []);

  return (
    <div className="text-gray-900 text-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left font-medium p-2"
      >
        <span className="text-gray-700">{organization.name}</span>
        <ChevronDown
          className={cn("h-5 w-5 transition-transform", {
            "rotate-180": open,
          })}
        />
      </button>

      {open && (
        <div className="px-3.5 relative">
          <ul className="mt-2 border-l py-0.5 px-2.5 space-y-3">
            {mapsets.data?.map((mapset) => (
              <MapsetItem
                mapset={mapset}
                onClick={handleAddLayer}
                isSelected={mapset.id === selectedMapset?.id}
                key={mapset.id}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
