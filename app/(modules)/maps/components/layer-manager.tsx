import { useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import L from "leaflet";
import { activeLayersAtom } from "../state/active-layers";
import { leafletLayerInstancesAtom } from "../state/leaflet-layer-instances";
import {
  featureInformationAtom,
  FeatureInformationType,
} from "../state/feature-information";

export const LayerManager = ({ map }: { map: L.Map | null }) => {
  const activeLayers = useAtomValue(activeLayersAtom);
  const setLayerInstances = useSetAtom(leafletLayerInstancesAtom);
  const setFeatureInformation = useSetAtom(featureInformationAtom);
  const previousLayers = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!map) return;

    const handleMapClick = async (e: L.LeafletMouseEvent) => {
      setFeatureInformation([]);

      // Find all visible WMS layers
      const wmsLayers = activeLayers.filter(
        (layer) => layer.layer.type === "wms" && layer.settings.visible
      );

      if (wmsLayers.length === 0) return;

      try {
        const allFeatureInfo: FeatureInformationType[] = [];

        for (const layer of wmsLayers) {
          if (layer.layer.type !== "wms") continue;

          const url = layer.layer.url;
          const layers = layer.layer.layers;

          if (!url || !layers) continue;

          // Get the map bounds and size
          const bounds = map.getBounds();
          const size = map.getSize();

          // Construct GetFeatureInfo URL
          const featureInfoUrl =
            `${url}?` +
            new URLSearchParams({
              service: "WMS",
              version: "1.1.1",
              request: "GetFeatureInfo",
              layers: layers,
              query_layers: layers,
              info_format: "application/json",
              feature_count: "20",
              x: Math.floor(e.containerPoint.x).toString(),
              y: Math.floor(e.containerPoint.y).toString(),
              width: Math.floor(size.x).toString(),
              height: Math.floor(size.y).toString(),
              srs: "EPSG:4326",
              bbox: `${bounds.getSouthWest().lng},${
                bounds.getSouthWest().lat
              },${bounds.getNorthEast().lng},${bounds.getNorthEast().lat}`,
            });

          // Fetch the feature info
          const response = await fetch(featureInfoUrl);
          if (!response.ok) continue;

          const featureData = await response.json();

          if (
            featureData &&
            featureData.features &&
            featureData.features.length > 0
          ) {
            const layerFeatureInfo = {
              id: layer.id,
              name: layer.name || layer.id,
              info: featureData.features,
            };

            allFeatureInfo.push(layerFeatureInfo);
          }
        }

        // Update state with all found features
        setFeatureInformation(
          allFeatureInfo.length > 0 ? allFeatureInfo : null
        );
      } catch (error) {
        console.error("Error fetching feature info:", error);
        setFeatureInformation(null);
      }
    };

    map.on("click", handleMapClick);

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
      map.off("click", handleMapClick);
      instances.forEach((layer) => layer.remove());
    };
  }, [activeLayers, map, setLayerInstances, setFeatureInformation]);

  return null;
};
