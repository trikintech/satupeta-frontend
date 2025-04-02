"use client";

import React, { useEffect, useRef, useState } from "react";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useAtomValue } from "jotai";
import { activeBasemapAtom } from "../state/activeBasemapAtom";
import { basemapConfig } from "../config/basemapConfig";
import { createCesiumProvider } from "../factories/cesiumProvider";

if (typeof window !== "undefined") {
  window.CESIUM_BASE_URL = "/cesium/";
}

export const CesiumMap: React.FC = () => {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState<boolean>(false);
  const activeBasemap = useAtomValue(activeBasemapAtom);

  useEffect(() => {
    let viewer: Cesium.Viewer | null = null;

    const initializeMap = async () => {
      if (cesiumContainer.current && !viewerRef.current) {
        try {
          viewer = new Cesium.Viewer(cesiumContainer.current, {
            baseLayerPicker: false,
            animation: false,
            timeline: false,
            geocoder: false,
            homeButton: false,
            navigationHelpButton: false,
            sceneModePicker: false,
          });
          viewerRef.current = viewer;

          viewer.scene.globe.enableLighting = true;

          setIsMapInitialized(true);
        } catch (error) {
          console.error("Error initializing Cesium:", error);
        }
      }
    };

    initializeMap();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
      if (cesiumContainer.current) {
        cesiumContainer.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    const applyBasemap = async () => {
      if (!viewerRef.current || !isMapInitialized) return;

      const viewer = viewerRef.current;
      const currentConfig = basemapConfig[activeBasemap];

      console.log(currentConfig);

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
        } else {
          console.error("Failed to create imagery provider");
        }
      } catch (error) {
        console.error("Error applying basemap:", error);
      }
    };

    applyBasemap();
  }, [activeBasemap, isMapInitialized]);

  return (
    <div ref={cesiumContainer} style={{ height: "100%", width: "100%" }} />
  );
};
