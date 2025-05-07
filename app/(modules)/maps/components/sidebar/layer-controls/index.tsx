import { useAtom } from "jotai";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ActiveLayer,
  activeLayersAtom,
  disableAllLayersAtom,
  enableAllLayersAtom,
  removeAllLayersAtom,
  reorderLayersAtom,
} from "../../../state/active-layers";
import EmptyState from "../empty-state";
import { mapAtom } from "../../../state/map";
import L from "leaflet";
import { LayerControlItem } from "./layer-control-item";
import { useCallback, useRef, useState } from "react";
import { leafletLayerInstancesAtom } from "../../../state/leaflet-layer-instances";
import { Eye, EyeOff, Trash2 } from "lucide-react";

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
    hover(item: { id: string; index: number }) {
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
  const [, removeAllLayers] = useAtom(removeAllLayersAtom);
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
      activeLayers.forEach((layer) => {
        const instance = layerInstances.get(layer.id);
        if (instance) instance.remove();
      });
    } else {
      enableAllLayers();
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
        {/* Dataset Count */}
        <div className="flex flex-col items-start mb-4 pt-4">
          <div className="font-medium flex justify-center items-center">
            <span>
              Dataset{" "}
              <span className="text-xs py-0.5 px-2 rounded bg-primary text-primary-foreground">
                {activeLayers.length}
              </span>
            </span>
          </div>

          {/* Buttons Below Dataset Text */}
          <div className="flex space-x-2 mt-2 justify-between w-full text-xs">
            <button
              className="px-0 cursor-pointer flex items-center hover:text-primary"
              onClick={toggleAllLayers}
              title={allLayersVisible ? "Hide all layers" : "Show all layers"}
            >
              {allLayersVisible ? (
                <EyeOff className="h-4 w-4 mr-1" />
              ) : (
                <Eye className="h-4 w-4 mr-1" />
              )}
              {allLayersVisible ? "Sembunyikan Semua" : "Tampilkan Semua"}
            </button>
            <button
              className="px-0 cursor-pointer flex items-center hover:text-primary"
              onClick={removeAllLayers}
              title={allLayersVisible ? "Hide all layers" : "Show all layers"}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Hapus Semua
            </button>
          </div>
        </div>

        {/* Layer List */}
        <div className="flex flex-col space-y-4 h-[60vh] overflow-auto">
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
