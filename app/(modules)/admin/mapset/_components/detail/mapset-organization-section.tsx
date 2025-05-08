import { Mapset } from "@/shared/types/mapset";

export default function MapsetOrganizationSection({
  mapset,
}: {
  mapset: Mapset;
}) {
  return (
    <div className="p-2 border rounded-[6px] border-zinc-200">
      <div className="py-2 px-4">
        <span className="text-lg font-semibold text-zinc-950">
          Informasi Organisasi
        </span>
      </div>
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">Nama Organisasi</div>
        <div className="text-sm text-zinc-800">{mapset.producer.name}</div>
      </div>
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">
          No. Telp Organisasi
        </div>
        <div className="text-sm text-zinc-800">
          {mapset.producer.phone_number}
        </div>
      </div>
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">Skala</div>
        <div className="text-sm text-zinc-800">{mapset.scale}</div>
      </div>
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">Sistem Proyeksi</div>
        <div className="text-sm text-zinc-800">
          {mapset.projection_system.name}
        </div>
      </div>
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">Kategori</div>
        <div className="text-sm text-zinc-800">{mapset.category.name}</div>
      </div>
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">Klasifikasi</div>
        <div className="text-sm text-zinc-800">
          {mapset.classification.name}
        </div>
      </div>
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">Status Data</div>
        <div className="text-sm text-zinc-800">{mapset.data_status}</div>
      </div>
    </div>
  );
}
