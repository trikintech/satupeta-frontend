import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Slider } from "@/shared/components/ui/slider";
import { ZoomIn, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import L from "leaflet";
import { getLegendUrl } from "../../../utils/wmsUtils";
import Image from "next/image";

interface LayerControlItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layer: any;
  layerInstance?: L.Layer;
  onRemove: () => void;
  onZoom: (bounds?: L.LatLngBoundsExpression | null) => void;
}

export const LayerControlItem = ({
  layer,
  layerInstance,
  onRemove,
  onZoom,
}: LayerControlItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const handleOpacityChange = (value: number[]) => {
    if (layerInstance && layerInstance instanceof L.TileLayer.WMS) {
      layerInstance.setOpacity(value[0]);
    }
    setOpacity(value[0]);
  };

  return (
    <div className="bg-muted p-3 rounded-lg">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="cursor-pointer w-full flex items-center justify-between py-2"
      >
        <h4 className="font-medium text-left text-sm">{layer.name}</h4>

        <div className="w-6 h-6 flex items-center justify-center shrink-0">
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </button>

      {isExpanded && (
        <div className="space-y-3 mt-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-2">
              {layer.layer.bounds && (
                <Button
                  size="sm"
                  onClick={() => onZoom(layer.layer.bounds)}
                  title="Zoom to layer"
                >
                  Ideal Zoom <ZoomIn size={16} />
                </Button>
              )}
              <Button size="sm" onClick={onRemove} title="Remove layer">
                Remove <Trash2 size={16} />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
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

          <div className="border-t pt-2 mt-2">
            <p className="text-sm font-medium mb-1">Legend</p>
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
        </div>
      )}
    </div>
  );
};
