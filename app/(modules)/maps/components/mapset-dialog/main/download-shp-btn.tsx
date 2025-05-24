import { Button } from "@/shared/components/ds/button";
import { ShpIcon } from "@/shared/components/icons";
import { Mapset } from "@/shared/types/mapset";
import { handleDownloadShp } from "@/shared/utils/download-mapset";
import { Download } from "lucide-react";

export default function DownloadShpBtn({ mapset }: { mapset: Mapset }) {
  return (
    <Button
      onClick={() => handleDownloadShp(mapset)}
      variant={"muted"}
      className="justify-between flex py-1.5 px-2"
      size="sm"
    >
      <div className="flex space-x-1 items-center">
        <ShpIcon className="w-4 h-4" />
        <span>SHP</span>
      </div>
      <Download className="w-4 h-4" />
    </Button>
  );
}
