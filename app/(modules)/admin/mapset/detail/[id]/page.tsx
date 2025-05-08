"use client";

import { MapsetDetail } from "../../_components/detail/mapset-detail";
import { useParams } from "next/navigation";

export default function MapsetDetailPage() {
  const params = useParams();

  return (
    <div className="p-6">
      <MapsetDetail id={params.id?.toString() ?? ""} />
    </div>
  );
}
