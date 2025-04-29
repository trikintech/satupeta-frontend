"use client";

import React from "react";
import { useAtom } from "jotai";
import { mapTypeAtom } from "../state/map-type";
import { CesiumMap } from "./cesium-map";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
});

const MapComponent: React.FC = () => {
  const [mapType] = useAtom(mapTypeAtom);

  return (
    <div className="absolute inset-0">
      {mapType === "leaflet" ? <LeafletMap /> : <CesiumMap />}
    </div>
  );
};

export default MapComponent;
