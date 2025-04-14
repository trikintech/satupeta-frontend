"use client";

import { mapsets } from "@/shared/utils/mapsets";
import { MapsetCard } from "../mapset-card";

export default function HighlightMapset() {
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
