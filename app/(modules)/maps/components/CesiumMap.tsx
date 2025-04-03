"use client";

import React from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useCesiumMap } from "../hooks/useCesiumMap";

if (typeof window !== "undefined") {
  window.CESIUM_BASE_URL = "/cesium/";
}

export const CesiumMap: React.FC = () => {
  const { cesiumContainer } = useCesiumMap();

  return (
    <div ref={cesiumContainer} style={{ height: "100%", width: "100%" }} />
  );
};
