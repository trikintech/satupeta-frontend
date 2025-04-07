import { useAtom } from "jotai";
import {
  activeLayersAtom,
  removeLayerAtom,
} from "../../../state/activeLayersAtom";
import EmptyState from "../EmptyState";
import { mapAtom } from "../../../state/mapAtom";
import L from "leaflet";
import { LayerControlItem } from "./LayerControlItem";

export default function LayerControls() {
  const [activeLayers] = useAtom(activeLayersAtom);
  const [, removeLayer] = useAtom(removeLayerAtom);
  const [map] = useAtom(mapAtom);

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
          <LayerControlItem
            key={layer.id}
            layer={layer}
            onRemove={() => removeLayer}
            onZoom={handleZoomToLayer}
          />
        ))}
      </div>
    </div>
  );
}
