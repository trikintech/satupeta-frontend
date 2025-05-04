/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { Organization } from "@/shared/types/organization";
import { Category } from "@/shared/types/category";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import mapsetApi from "@/shared/services/mapset";
import { selectedMapsetAtom } from "../../../../state/mapset-dialog";
import { useAtom } from "jotai";
import { Mapset } from "@/shared/types/mapset";
import MapsetItem from "./mapset-item";

interface GroupMapsetProps {
  item: Organization | Category;
  type: "organization" | "category";
  search: string;
}

export default function GroupMapset({ item, type, search }: GroupMapsetProps) {
  const [open, setOpen] = useState(!!search);
  const [selectedMapset, setSelectedMapset] = useAtom(selectedMapsetAtom);
  const queryClient = useQueryClient();

  const qParams = {
    filter: JSON.stringify([
      type === "organization"
        ? `producer_id=${item.id}`
        : `category_id=${item.id}`,
    ]),
    search,
  };

  const { data: mapsets, isLoading } = useQuery({
    queryKey: ["mapsets", type, item.id, search],
    queryFn: () =>
      mapsetApi.getMapsets(qParams).then((res) => {
        return res.items;
      }),
    staleTime: 5000,
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["mapsets", type, item.id, search],
    });
  }, [search, item.id, type, queryClient]);

  const handleAddLayer = useCallback((mapset: Mapset) => {
    setSelectedMapset(mapset);
  }, []);

  if (isLoading) {
    return (
      <div className="text-gray-900 text-sm">
        <button
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center w-full text-left font-medium p-2"
        >
          <span className="text-gray-700">{item.name}</span>
          <ChevronDown
            className={cn("h-5 w-5 transition-transform", {
              "rotate-180": open,
            })}
          />
        </button>
        {open && (
          <div className="px-3.5 relative">
            <div className="mt-2 border-l py-4 px-2.5 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
              <span className="ml-2 text-gray-500">Loading mapsets...</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if ((mapsets?.length || 0) === 0) {
    return <></>;
  }

  return (
    <div className="text-gray-900 text-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left font-medium p-2"
      >
        <span className="text-gray-700">{item.name}</span>
        <ChevronDown
          className={cn("h-5 w-5 transition-transform", {
            "rotate-180": open,
          })}
        />
      </button>

      {open && (
        <div className="px-3.5 relative">
          <ul className="mt-2 border-l py-0.5 px-2.5 space-y-3">
            {mapsets?.map((mapset) => (
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
