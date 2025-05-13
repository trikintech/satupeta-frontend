"use client";

import { useParams } from "next/navigation";
import MapSourceDetail from "../../_components/detail";
import PageHeader from "../../../_components/page-header";

export default function MapSourceDetailPage() {
  const params = useParams();

  return (
    <div className="space-y-6">
      <PageHeader title="Detail Mapserver & Metadata" className="bg-zinc-50" />
      <MapSourceDetail id={params.id?.toString() ?? ""} />
    </div>
  );
}
