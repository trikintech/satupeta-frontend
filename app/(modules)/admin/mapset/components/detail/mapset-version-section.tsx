import { Mapset } from "@/shared/types/mapset";

export default function MapsetVersionSection({ mapset }: { mapset: Mapset }) {
  return (
    <div className="p-2 border rounded-[6px] border-zinc-200">
      <div className="py-2 px-4">
        <span className="text-lg font-semibold text-zinc-950">Versi</span>
      </div>
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">
          Periode Update Data
        </div>
        <div className="text-sm text-zinc-800">{mapset.data_update_period}</div>
      </div>
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">
          Edisi/Versi Data
        </div>
        <div className="text-sm text-zinc-800">{mapset.data_version}</div>
      </div>
    </div>
  );
}
