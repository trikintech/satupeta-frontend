import { useEffect, useRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import L from "leaflet";
import { activeLayersAtom } from "../state/active-layers";
import { leafletLayerInstancesAtom } from "../state/leaflet-layer-instances";
import {
  featureInformationAtom,
  FeatureInformationType,
} from "../state/feature-information";
import { FeatureCollection, Geometry } from "geojson";
import { constructWfsUrl } from "@/shared/utils/wms";
import colorScaleApi from "@/shared/services/color-scale";
import { appConfig } from "@/shared/config/app-config";
import { mergeDataToGeoJSON } from "@/shared/utils/mege-data-geojson";
import jatimGeojson from "@/public/jatim.json";

export const LayerManager = ({ map }: { map: L.Map | null }) => {
  const activeLayers = useAtomValue(activeLayersAtom);
  const [layerInstances, setLayerInstances] = useAtom(
    leafletLayerInstancesAtom
  );
  const setFeatureInformation = useSetAtom(featureInformationAtom);
  const previousLayersRef = useRef<
    Map<string, { visible: boolean; opacity: number; zIndex: number }>
  >(new Map());

  // Handle map click for feature info
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

    return () => {
      map.off("click", handleMapClick);
    };
  }, [map, activeLayers, setFeatureInformation]);

  // Handle layer creation and removal
  useEffect(() => {
    if (!map) return;

    console.log(layerInstances);

    const instances = layerInstances;
    const currentLayerIds = new Set(activeLayers.map((layer) => layer.id));

    // Remove layers that are no longer in activeLayers
    instances.forEach((layer, id) => {
      if (!currentLayerIds.has(id)) {
        layer.remove();
        instances.delete(id);
      }
    });

    // Create new layers
    const layerPromises: Promise<{
      id: string;
      zIndex: number;
      leafletLayer: L.Layer;
      bounds?: L.LatLngBoundsExpression;
      visible: boolean;
    } | null>[] = [];

    activeLayers.forEach((layer) => {
      if (instances.has(layer.id)) return; // Skip if layer already exists

      const mode = layer.mode || "basic";

      if (mode === "basic" && layer.layer.type === "wms") {
        const leafletLayer = L.tileLayer.wms(layer.layer.url ?? "", {
          layers: layer.layer.layers,
          format: "image/png",
          transparent: true,
          opacity: layer.settings.opacity,
          zIndex: layer.settings.zIndex,
        });

        layerPromises.push(
          Promise.resolve({
            id: layer.id,
            zIndex: layer.settings.zIndex ?? 0,
            leafletLayer,
            bounds: layer.layer.bounds ?? undefined,
            visible: layer.settings.visible,
          })
        );
      } else if (mode === "choropleth") {
        const promise = (async () => {
          try {
            const sourceUrl = constructWfsUrl(layer.layer) as string;
            const colorScale = await colorScaleApi.getColorScale({
              source_url: sourceUrl,
              boundary_file_id: appConfig.boundaryFileId,
            });
            if (!colorScale?.data) return null;

            const enrichedGeoJSON = mergeDataToGeoJSON(
              jatimGeojson as FeatureCollection<
                Geometry,
                Record<string, unknown>
              >,
              colorScale.data
            );

            const leafletLayer = L.geoJSON(enrichedGeoJSON, {
              style: (feature) => ({
                fillColor: feature?.properties?.color || "#cccccc",
                weight: 2,
                color: "#333333",
                fillOpacity: 0.7,
              }),
              onEachFeature: (feature, layerInstance) => {
                const props = feature.properties;
                layerInstance.bindPopup(
                  `<strong>${props.WADMKK}, ${props.WADMPR}</strong><br>Value: ${props.value}`
                );
              },
            });

            return {
              id: layer.id,
              zIndex: layer.settings.zIndex ?? 0,
              leafletLayer,
              visible: layer.settings.visible,
            };
          } catch (err) {
            console.error("Failed to add choropleth layer", err);
            return null;
          }
        })();
        layerPromises.push(promise);
      }
    });

    // Add new layers to map and instances
    Promise.all(layerPromises).then((results) => {
      results
        .filter((r): r is NonNullable<typeof r> => !!r)
        .sort((a, b) => a.zIndex - b.zIndex)
        .forEach(({ id, leafletLayer, visible, bounds }) => {
          instances.set(id, leafletLayer);

          // Only add to map if visible
          if (visible) {
            leafletLayer.addTo(map);
            // Only fit bounds for newly added layers
            if (bounds && !previousLayersRef.current.has(id)) {
              map.fitBounds(bounds);
            }
          }
        });

      setLayerInstances(instances);
    });
  }, [activeLayers, map, setLayerInstances, layerInstances]);

  // Handle visibility, opacity, and zIndex changes separately
  useEffect(() => {
    if (!map) return;

    const instances = layerInstances;

    activeLayers.forEach((layer) => {
      const leafletLayer = instances.get(layer.id);
      if (!leafletLayer) return;

      const previousLayer = previousLayersRef.current.get(layer.id);
      const currentSettings = layer.settings;

      // Handle visibility changes
      if (!previousLayer || previousLayer.visible !== currentSettings.visible) {
        if (currentSettings.visible) {
          if (!map.hasLayer(leafletLayer)) {
            leafletLayer.addTo(map);
          }
        } else {
          if (map.hasLayer(leafletLayer)) {
            map.removeLayer(leafletLayer);
          }
        }
      }

      // Handle opacity changes
      if (!previousLayer || previousLayer.opacity !== currentSettings.opacity) {
        if ("setOpacity" in leafletLayer) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (leafletLayer as any).setOpacity(currentSettings.opacity);
        }
      }

      // Handle zIndex changes
      if (!previousLayer || previousLayer.zIndex !== currentSettings.zIndex) {
        if ("setZIndex" in leafletLayer) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (leafletLayer as any).setZIndex(currentSettings.zIndex);
        }
      }

      // Update previous layer state
      previousLayersRef.current.set(layer.id, {
        visible: currentSettings.visible,
        opacity: currentSettings.opacity,
        zIndex: currentSettings.zIndex,
      });
    });

    // Clean up previous layer references for removed layers
    const currentLayerIds = new Set(activeLayers.map((l) => l.id));
    previousLayersRef.current.forEach((_, id) => {
      if (!currentLayerIds.has(id)) {
        previousLayersRef.current.delete(id);
      }
    });
  }, [activeLayers, map, layerInstances]);

  return null;
};
