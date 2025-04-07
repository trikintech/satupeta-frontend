import { useAtom } from "jotai";
import {
  activeLayersAtom,
  removeLayerAtom,
} from "../../state/activeLayersAtom";
import { Slider } from "@/shared/components/ui/slider";
import { Button } from "@/shared/components/ui/button";
import { ZoomIn, Trash2 } from "lucide-react";
import EmptyState from "./EmptyState";
import { mapAtom } from "../../state/mapAtom";
import { leafletLayerInstancesAtom } from "../../state/leafletLayerInstancesAtom";
import L from "leaflet";
import { useState } from "react";
import { getLegendUrl } from "../../utils/wmsUtils";

export default function LayerControls() {
  const [activeLayers] = useAtom(activeLayersAtom);
  const [, removeLayer] = useAtom(removeLayerAtom);
  const [map] = useAtom(mapAtom);
  const [layerInstances] = useAtom(leafletLayerInstancesAtom);
  const [opacity, setOpacity] = useState(1);

  const handleZoomToLayer = (bounds?: L.LatLngBoundsExpression | null) => {
    if (!map) return;
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setZoom(map.getZoom() + 1);
    }
  };

  if (activeLayers.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="px-4 py-2 font-semibold">
        Active Layers({activeLayers.length})
      </div>
      <div className="px-4 flex flex-col space-y-4 h-[70vh] overflow-auto">
        {activeLayers.map((layer) => (
          <div key={layer.id} className="bg-muted p-3 rounded-lg">
            <h4 className="font-medium">{layer.name}</h4>
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-2">
                {layer.layer.bounds && (
                  <Button
                    size="sm"
                    onClick={() => handleZoomToLayer(layer.layer.bounds)}
                    title="Zoom to layer"
                  >
                    Ideal Zoom <ZoomIn size={16} />
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() => removeLayer(layer.id)}
                  title="Remove layer"
                >
                  Remove
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Opacity: {Math.round(opacity * 100)}%
                </label>
                <Slider
                  value={[opacity]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => {
                    const leafletLayer = layerInstances.get(layer.id);

                    if (
                      leafletLayer &&
                      leafletLayer instanceof L.TileLayer.WMS
                    ) {
                      leafletLayer.setOpacity(value[0]);
                      setOpacity(value[0]);
                    }
                  }}
                />
              </div>

              <div className="border-t pt-2 mt-2">
                <p className="text-sm font-medium mb-1">Legend</p>
                <div className="text-xs text-gray-500">
                  {layer.layer.url ? (
                    <img
                      src={getLegendUrl({
                        baseUrl: layer.layer.url,
                        layerName: layer.layer.layers ?? "",
                        width: 200,
                      })}
                      alt={`${layer.name} legend`}
                      className="max-w-full"
                    />
                  ) : (
                    <p>No legend available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
