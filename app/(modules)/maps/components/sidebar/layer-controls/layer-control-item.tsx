import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Slider } from "@/shared/components/ui/slider";
import {
  Trash2,
  Info,
  ChevronUp,
  GripHorizontal,
  Eye,
  EyeOff,
  Download,
  MousePointer2,
} from "lucide-react";
import L from "leaflet";
import { getLegendUrl } from "../../../../../../shared/utils/wms";
import Image from "next/image";
import { useAtom } from "jotai";
import {
  isOpenMapsetDialogAtom,
  selectedMapsetAtom,
} from "../../../state/mapset-dialog";
import { useQuery } from "@tanstack/react-query";
import {
  ActiveLayer,
  removeLayerAtom,
  toggleLayerAtom,
} from "../../../state/active-layers";
import { mapAtom } from "../../../state/map";
import mapsetApi from "@/shared/services/mapset";

interface LayerControlItemProps {
  layer: ActiveLayer;
  layerInstance?: L.Layer;
  onZoom: (bounds?: L.LatLngBoundsExpression | null) => void;
}

export const LayerControlItem = ({
  layer,
  layerInstance,
  onZoom,
}: LayerControlItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [, setIsOpenDialog] = useAtom(isOpenMapsetDialogAtom);
  const [, setSelectedMapset] = useAtom(selectedMapsetAtom);
  const [, removeLayer] = useAtom(removeLayerAtom);
  const [, toggleLayer] = useAtom(toggleLayerAtom);
  const { data: mapsets } = useQuery({
    queryKey: ["mapsets"],
    queryFn: () =>
      mapsetApi.getMapsets().then((res) => {
        return res.items;
      }),
  });
  const [map] = useAtom(mapAtom);

  const handleOpacityChange = (value: number[]) => {
    if (layerInstance && layerInstance instanceof L.TileLayer.WMS) {
      layerInstance.setOpacity(value[0]);
    }
    setOpacity(value[0]);
  };

  const handleInfo = () => {
    if (!mapsets) return;

    const foundMapset = mapsets.find((mapset) => mapset.id === layer.source.id);

    if (foundMapset) {
      setSelectedMapset(foundMapset);
      setIsOpenDialog(true);
    } else {
      console.warn("Mapset not found for this layer:", layer.id);
    }
  };

  const handleToggleVisibility = () => {
    if (!map) return;

    toggleLayer(layer.id);
    if (layerInstance) {
      if (layer.settings.visible) {
        layerInstance.remove();
      } else {
        layerInstance.addTo(map);
      }
    }
  };

  function toLatLngBounds(bounds: L.LatLngBoundsExpression): L.LatLngBounds {
    // Jika sudah objek LatLngBounds, return langsung
    if ("getSouthWest" in bounds && "getNorthEast" in bounds) {
      return bounds as L.LatLngBounds;
    }
    // Kalau array koordinat, convert dengan L.latLngBounds()
    return L.latLngBounds(bounds as L.LatLngExpression[]);
  }

  const handleDownloadImage = () => {
    if (!layer.layer.url || !layer.layer.layers) return;

    const rawBounds = layer.layer.bounds ?? map?.getBounds() ?? null;
    if (!rawBounds) return;

    const bounds = toLatLngBounds(rawBounds);

    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();

    const bbox = [
      southWest.lng,
      southWest.lat,
      northEast.lng,
      northEast.lat,
    ].join(",");

    const width = 1024;
    const height = 768;

    const downloadUrl = `${layer.layer.url}?service=WMS&version=1.1.1&request=GetMap&layers=${layer.layer.layers}&styles=&bbox=${bbox}&width=${width}&height=${height}&srs=EPSG:4326&format=image/png&transparent=true`;

    window.open(downloadUrl, "_blank");
  };

  return (
    <div className="bg-muted rounded-lg border border-primary p-3">
      <div className="cursor-pointer w-full flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <button className="cursor-pointer self-start mt-0.5">
            <GripHorizontal className="w-4 h-4 text-zinc-950"></GripHorizontal>
          </button>
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`text-left text-zinc-700 text-sm cursor-pointer ${
              !isExpanded && "line-clamp-1"
            }`}
          >
            {layer.name}
          </button>
        </div>

        {!isExpanded && (
          <button
            onClick={handleToggleVisibility}
            className="cursor-pointer flex items-center justify-center"
            title={layer.settings.visible ? "Hide layer" : "Show layer"}
          >
            {layer.settings.visible ? (
              <Eye className="h-4 w-4 text-zinc-950" />
            ) : (
              <EyeOff className="h-4 w-4 text-zinc-950" />
            )}
          </button>
        )}

        {/* Vertical Line */}
        {!isExpanded && (
          <div className="border-l border-gray-300 h-4 mx-2"></div>
        )}

        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center justify-center shrink-0 self-start mt-0.5"
        >
          {isExpanded ? (
            <ChevronUp
              size={12}
              className="h-4 w-4 rotate-0 shrink-0 text-zinc-950"
            />
          ) : (
            <ChevronUp size={12} className="rotate-180 h-4 w-4 text-zinc-950" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-3 mt-3">
          <div className="pt-2 mt-2">
            <div className="text-xs text-gray-500">
              {layer.layer.url ? (
                <Image
                  src={getLegendUrl({
                    baseUrl: layer.layer.url,
                    layerName: layer.layer.layers ?? "",
                    width: 200,
                  })}
                  alt={`${layer.name} legend`}
                  width={200}
                  height={40}
                  className="w-auto h-auto max-w-full"
                  unoptimized
                />
              ) : (
                <p>No legend available</p>
              )}
            </div>
          </div>
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
              onClick={handleInfo}
            >
              <Info size={24} />
              <span>Informasi</span>
            </Button>
            <div className="h-full w-px bg-gray-200" />
            <Button
              variant="ghost"
              className="flex items-center gap-1  hover:bg-transparent font-normal"
              onClick={() => removeLayer(layer.id)}
            >
              <Trash2 size={24} />
            </Button>
            <div className="h-full w-px bg-gray-200" />
            <Button
              variant="ghost"
              className="flex items-center gap-1  hover:bg-transparent font-normal"
              onClick={() => handleDownloadImage()}
            >
              <Download size={24} />
            </Button>
          </div>

          <div>
            <label className="block text-sm text-zinc-700 mb-1">
              Opacity: {Math.round(opacity * 100)}%
            </label>
            <Slider
              value={[opacity]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleOpacityChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};
