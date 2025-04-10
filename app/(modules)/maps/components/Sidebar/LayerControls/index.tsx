import { useAtom } from "jotai";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ActiveLayer,
  activeLayersAtom,
  reorderLayersAtom,
} from "../../../state/active-layers";
import EmptyState from "../EmptyState";
import { mapAtom } from "../../../state/map";
import L from "leaflet";
import { LayerControlItem } from "./LayerControlItem";
import { useCallback, useRef } from "react";
import { leafletLayerInstancesAtom } from "../../../state/leaflet-layer-instances";

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
  const [map] = useAtom(mapAtom);
  const [layerInstances] = useAtom(leafletLayerInstancesAtom);

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

  if (activeLayers.length === 0) {
    return <EmptyState />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="px-4 py-2 font-semibold">
          Active Layers({activeLayers.length})
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
