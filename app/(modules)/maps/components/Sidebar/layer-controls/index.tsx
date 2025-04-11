import { useAtom } from "jotai";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ActiveLayer,
  activeLayersAtom,
  disableAllLayersAtom,
  enableAllLayersAtom,
  reorderLayersAtom,
} from "../../../state/active-layers";
import EmptyState from "../empty-state";
import { mapAtom } from "../../../state/map";
import L from "leaflet";
import { LayerControlItem } from "./layer-control-item";
import { useCallback, useRef, useState } from "react";
import { leafletLayerInstancesAtom } from "../../../state/leaflet-layer-instances";
import { Button } from "@/shared/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface DragItem {
  id: string;
  index: number;
}

const DraggableLayerItem = ({
  layer,
  layerInstance,
  index,
  moveLayer,
  onZoom,
}: {
  layer: ActiveLayer;
  layerInstance?: L.Layer;
  index: number;
  moveLayer: (dragIndex: number, hoverIndex: number) => void;
  onZoom: (bounds?: L.LatLngBoundsExpression | null) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "LAYER",
    item: { id: layer.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "LAYER",
    hover(item: DragItem) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveLayer(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-pointer"
    >
      <LayerControlItem
        layer={layer}
        layerInstance={layerInstance}
        onZoom={onZoom}
      />
    </div>
  );
};

export default function LayerControls() {
  const [activeLayers] = useAtom(activeLayersAtom);
  const [, reorderLayers] = useAtom(reorderLayersAtom);
  const [, enableAllLayers] = useAtom(enableAllLayersAtom);
  const [, disableAllLayers] = useAtom(disableAllLayersAtom);
  const [map] = useAtom(mapAtom);
  const [layerInstances] = useAtom(leafletLayerInstancesAtom);
  const [allLayersVisible, setAllLayersVisible] = useState(true);

  const handleZoomToLayer = (bounds?: L.LatLngBoundsExpression | null) => {
    if (!map) return;
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setZoom(map.getZoom() + 1);
    }
  };

  const moveLayer = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      reorderLayers({ fromIndex: dragIndex, toIndex: hoverIndex });
    },
    [reorderLayers]
  );

  const toggleAllLayers = () => {
    if (allLayersVisible) {
      disableAllLayers();
      // Hide all layers from the map
      activeLayers.forEach((layer) => {
        const instance = layerInstances.get(layer.id);
        if (instance) instance.remove();
      });
    } else {
      enableAllLayers();
      // Show all layers on the map
      activeLayers.forEach((layer) => {
        const instance = layerInstances.get(layer.id);
        if (instance && map) instance.addTo(map);
      });
    }
    setAllLayersVisible(!allLayersVisible);
  };

  if (activeLayers.length === 0) {
    return <EmptyState />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="px-4 py-2 flex justify-between items-center">
          <div className="font-semibold">
            Active Layers({activeLayers.length})
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAllLayers}
            title={allLayersVisible ? "Hide all layers" : "Show all layers"}
          >
            {allLayersVisible ? (
              <EyeOff className="h-4 w-4 mr-1" />
            ) : (
              <Eye className="h-4 w-4 mr-1" />
            )}
            {allLayersVisible ? "Hide All" : "Show All"}
          </Button>
        </div>
        <div className="px-4 flex flex-col space-y-4 h-[70vh] overflow-auto">
          {[...activeLayers].reverse().map((layer, i) => {
            const index = activeLayers.length - 1 - i;
            const layerInstance = layerInstances.get(layer.id);

            return (
              <DraggableLayerItem
                key={layer.id}
                index={index}
                layer={layer}
                layerInstance={layerInstance}
                moveLayer={moveLayer}
                onZoom={handleZoomToLayer}
              />
            );
          })}
        </div>
      </div>
    </DndProvider>
  );
}
