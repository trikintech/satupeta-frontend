import { Button } from "@/shared/components/ui/button";
import { Info, Trash2, Download, MousePointer2 } from "lucide-react";
import { ActiveLayer } from "../../../state/active-layers";
import L from "leaflet";

interface LayerActionsProps {
  layer: ActiveLayer;
  onZoom: (bounds?: L.LatLngBoundsExpression | null) => void;
  onInfo: () => void;
  onRemove: () => void;
  onDownload: () => void;
}

export const LayerActions = ({
  layer,
  onZoom,
  onInfo,
  onRemove,
  onDownload,
}: LayerActionsProps) => {
  return (
    <div className="text-sm flex justify-between items-center border text-zinc-950 border-zinc-200">
      <Button
        variant="ghost"
        className="flex items-center gap-1 hover:bg-transparent font-normal"
        onClick={() => layer.layer.bounds && onZoom(layer.layer.bounds)}
      >
        <MousePointer2 size={24} />
        <span>Pusatkan</span>
      </Button>
      <div className="h-full w-px bg-gray-200" />
      <Button
        variant="ghost"
        className="flex items-center gap-1  hover:bg-transparent font-normal"
        onClick={onInfo}
      >
        <Info size={24} />
        <span>Informasi</span>
      </Button>
      <div className="h-full w-px bg-gray-200" />
      <Button
        variant="ghost"
        className="flex items-center gap-1  hover:bg-transparent font-normal"
        onClick={onRemove}
      >
        <Trash2 size={24} />
      </Button>
      <div className="h-full w-px bg-gray-200" />
      <Button
        variant="ghost"
        className="flex items-center gap-1  hover:bg-transparent font-normal"
        onClick={onDownload}
      >
        <Download size={24} />
      </Button>
    </div>
  );
};
