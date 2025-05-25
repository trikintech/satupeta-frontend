import { Button } from "@/shared/components/ds/button";
import { GeoJsonIcon } from "@/shared/components/icons";
import { Mapset } from "@/shared/types/mapset";
import { handleDownloadGeojson } from "@/shared/utils/download-mapset";
import { Download } from "lucide-react";

export default function DownloadGeojsonBtn({ mapset }: { mapset: Mapset }) {
  return (
    <Button
      onClick={() => handleDownloadGeojson(mapset)}
      variant={"muted"}
      className="justify-between flex py-1.5 px-2"
      size="sm"
    >
      <div className="flex space-x-1 items-center">
        <GeoJsonIcon className="w-4 h-4" />
        <span>GeoJson</span>
      </div>
      <Download className="w-4 h-4" />
    </Button>
  );
}
