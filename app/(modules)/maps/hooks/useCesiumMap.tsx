import { useRef, useState, useEffect, useCallback } from "react";
import * as Cesium from "cesium";
import { createCesiumProvider } from "../factories/cesiumProvider";
import { leafletZoomToCesiumHeight } from "../utils/cesiumUtils";
import { activeBasemapAtom } from "../state/activeBasemapAtom";
import { useAtom, useAtomValue } from "jotai";
import { mapSettingsAtom } from "../state/mapSettingsAtom";
import { basemapConfig } from "../config/basemapConfig";

export const useCesiumMap = () => {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const activeBasemap = useAtomValue(activeBasemapAtom);
  const [mapSettings] = useAtom(mapSettingsAtom);

  useEffect(() => {
    if (!cesiumContainer.current || viewerRef.current) return;

    try {
      const viewer = new Cesium.Viewer(cesiumContainer.current, {
        baseLayerPicker: false,
        animation: false,
        timeline: false,
        geocoder: false,
        homeButton: false,
        navigationHelpButton: false,
        sceneModePicker: false,
        requestRenderMode: true,
        maximumRenderTimeChange: Infinity,
      });
      viewerRef.current = viewer;

      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          mapSettings.center[1],
          mapSettings.center[0],
          leafletZoomToCesiumHeight(mapSettings.zoomLevel)
        ),
      });

      viewer.scene.globe.enableLighting = true;
      setIsMapInitialized(true);
    } catch (error) {
      console.error("Error initializing Cesium:", error);
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!viewerRef.current || !isMapInitialized) return;

    const applyBasemap = async () => {
      const viewer = viewerRef.current;
      const currentConfig = basemapConfig[activeBasemap];

      if (!viewer) return;

      if (!currentConfig?.cesium) {
        console.error(
          `Missing Cesium configuration for basemap: ${activeBasemap}`
        );
        return;
      }

      try {
        const layers = viewer.imageryLayers;
        layers.removeAll();

        viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();

        const provider = await createCesiumProvider(currentConfig.cesium);
        if (provider) {
          layers.addImageryProvider(provider as Cesium.ImageryProvider);
          viewer.scene.requestRender();
        } else {
          console.error("Failed to create imagery provider");
        }
      } catch (error) {
        console.error("Error applying basemap:", error);
      }
    };

    applyBasemap();
  }, [activeBasemap, isMapInitialized]);

  const flyToLocation = useCallback(
    (
      latitude: number,
      longitude: number,
      height?: number,
      duration?: number
    ) => {
      if (!viewerRef.current) return;

      const finalHeight =
        height ?? leafletZoomToCesiumHeight(mapSettings.zoomLevel);

      viewerRef.current.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          longitude,
          latitude,
          finalHeight
        ),
        duration: duration ?? 2.0,
      });
    },
    [mapSettings.zoomLevel]
  );

  return {
    cesiumContainer,
    viewerRef,
    isMapInitialized,
    activeBasemap,
    flyToLocation,
  };
};
