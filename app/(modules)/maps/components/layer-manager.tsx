import { useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import L from "leaflet";
import { activeLayersAtom } from "../state/active-layers";
import { leafletLayerInstancesAtom } from "../state/leaflet-layer-instances";

export const LayerManager = ({ map }: { map: L.Map | null }) => {
  const activeLayers = useAtomValue(activeLayersAtom);
  const setLayerInstances = useSetAtom(leafletLayerInstancesAtom);
  const previousLayers = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!map) return;

    const instances = new Map<string, L.Layer>();
    const currentLayerIds = new Set<string>();

    activeLayers.forEach((layer) => {
      currentLayerIds.add(layer.id);

      if (instances.has(layer.id)) return;

      if (layer.layer.type === "wms") {
        const wmsLayer = L.tileLayer.wms(layer.layer.url ?? "", {
          layers: layer.layer.layers,
          format: "image/png",
          transparent: true,
          opacity: layer.settings.opacity,
          zIndex: layer.settings.zIndex,
        });

        if (layer.settings.visible) {
          wmsLayer.addTo(map);

          if (!previousLayers.current.has(layer.id)) {
            if (layer.layer.bounds) map.fitBounds(layer.layer.bounds);
          }
        }

        instances.set(layer.id, wmsLayer);
      }
    });

    previousLayers.current = currentLayerIds;
    setLayerInstances(instances);

    return () => {
      instances.forEach((layer) => layer.remove());
    };
  }, [activeLayers, map, setLayerInstances]);

  return null;
};
