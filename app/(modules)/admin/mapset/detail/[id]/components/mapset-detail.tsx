"use client";
import { useQuery } from "@tanstack/react-query";
// import { MapsetActions } from "./mapset-actions";
// import { MapsetInfoSection } from "./mapset-info-section";
// import { MapsetMetadataSection } from "./mapset-metadata-section";
// import { MapsetOrganizationSection } from "./mapset-organization-section";
// import { MapsetClassificationSection } from "./mapset-classification-section";
import mapsetApi from "@/shared/services/mapset";
import { MapsetStatus } from "./mapset-status";

interface MapsetDetailProps {
  id: string;
}

export function MapsetDetail({ id }: MapsetDetailProps) {
  const { data: mapset } = useQuery({
    queryKey: ["mapset", id],
    queryFn: () => mapsetApi.getMapsetById(id),
  });

  if (!mapset) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mapset Detail</h1>
        <div className="text-sm text-gray-500">
          Diperbarui {mapset.updated_at}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <MapsetStatus mapset={mapset} />
        <div className="border-l h-6 border-gray-200" />
      </div>

      <div className="flex justify-between items-center mb-6">
        {mapset.is_popular && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md">
            Mapset Populer
          </div>
        )}

        {/* <MapsetActions id={mapset.id} /> */}
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <MapsetInfoSection mapset={mapset} />
          <MapsetOrganizationSection organization={mapset.organization} />
        </div>
        <div className="space-y-6">
          <MapsetMetadataSection metadata={mapset.metadata} />
          <MapsetClassificationSection
            classification={mapset.classification}
            updates={mapset.updates}
          />
        </div>
      </div> */}
    </div>
  );
}
