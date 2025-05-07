"use client";

import { MapsetDetail } from "../../components/detail/mapset-detail";
import { useParams } from "next/navigation";

export default function MapsetDetailPage() {
  const params = useParams();

  return (
    <div className="container mx-auto p-4">
      <MapsetDetail id={params.id?.toString() ?? ""} />
    </div>
  );
}
