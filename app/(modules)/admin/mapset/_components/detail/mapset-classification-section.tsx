import { Mapset } from "@/shared/types/mapset";

export default function MapsetClassificationSection({
  mapset,
}: {
  mapset: Mapset;
}) {
  return (
    <div className="p-2 border rounded-[6px] border-zinc-200">
      <div className="py-2 px-4">
        <span className="text-lg font-semibold text-zinc-950">
          Klasifikasi Wilayah
        </span>
      </div>
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">
          Tingkat Penyajian Wilayah
        </div>
        <div className="text-sm text-zinc-800">
          {mapset.coverage_level ?? "-"}
        </div>
      </div>
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">Cakupan Wilayah</div>
        <div className="text-sm text-zinc-800">
          {mapset.coverage_area ?? "-"}
        </div>
      </div>
    </div>
  );
}
