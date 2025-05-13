"use client";

import mapSourceApi from "@/shared/services/map-source";
import { useQuery } from "@tanstack/react-query";
import DetailItem from "../../_components/detail-item";

export default function MapSourceDetail({ id }: { id: string }) {
  const { data: mapSource } = useQuery({
    queryKey: ["mapSource", id],
    queryFn: () => mapSourceApi.getMapSourceById(id),
  });

  if (!mapSource) return <div>Loading...</div>;

  return (
    <div>
      <div className="mx-6 p-2 border rounded-[6px] border-zinc-200">
        <div className="py-2 px-4">
          <span className="text-lg font-semibold text-zinc-950">
            Informasi Mapserver & Metadata
          </span>
        </div>

        <DetailItem label="Nama" value={mapSource.name} />
        <DetailItem label="Deskripsi" value={mapSource.description} />

        {/* Credential Info */}
        <DetailItem
          label="Tipe"
          value={mapSource.credential?.credential_type || "Tidak tersedia"}
        />
        {/* Status & Metadata */}
        <DetailItem
          label="Status"
          value={mapSource.is_active ? "Aktif" : "Tidak Aktif"}
        />
        <DetailItem
          label="Dibuat Pada"
          value={new Date(mapSource.created_at).toLocaleString("id-ID")}
        />
        <DetailItem
          label="Diperbarui Pada"
          value={new Date(mapSource.updated_at).toLocaleString("id-ID")}
        />
      </div>
    </div>
  );
}
