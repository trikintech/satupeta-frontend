import { Button } from "@/shared/components/ds/button";
import { KmlIcon } from "@/shared/components/icons";
import { Mapset } from "@/shared/types/mapset";
import { handleDownloadKml } from "@/shared/utils/download-mapset";
import { Download } from "lucide-react";

export default function DownloadKmlBtn({ mapset }: { mapset: Mapset }) {
  return (
    <Button
      onClick={() => handleDownloadKml(mapset)}
      variant={"muted"}
      className="justify-between flex py-1.5 px-2"
      size="sm"
    >
      <div className="flex space-x-1 items-center">
        <KmlIcon className="w-4 h-4" />
        <span>KML</span>
      </div>
      <Download className="w-4 h-4" />
    </Button>
  );
}
