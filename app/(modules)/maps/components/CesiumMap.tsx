"use client";

import React, { useEffect, useRef } from "react";
import { Viewer, createWorldTerrainAsync } from "cesium"; // Updated import
import "cesium/Build/Cesium/Widgets/widgets.css"; // Don't forget the CSS

if (typeof window !== "undefined") {
  window.CESIUM_BASE_URL = "/cesium/"; // Must match where assets are served
}

export const CesiumMap: React.FC = () => {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    let viewer: Viewer | null = null;

    const initializeMap = async () => {
      if (cesiumContainer.current && !viewerRef.current) {
        try {
          const terrainProvider = await createWorldTerrainAsync();
          viewer = new Viewer(cesiumContainer.current, {
            terrainProvider,
            // Other viewer options...
          });
          viewerRef.current = viewer;

          viewer.scene.globe.enableLighting = true;
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

  return (
    <div ref={cesiumContainer} style={{ height: "100%", width: "100%" }} />
  );
};
