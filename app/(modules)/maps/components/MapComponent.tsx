"use client";

import React from "react";
import { useAtom } from "jotai";
import { mapTypeAtom } from "../state/mapAtom";
import { CesiumMap } from "./CesiumMap";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });
const MapComponent: React.FC = () => {
  const [mapType, setMapType] = useAtom(mapTypeAtom);

  return (
    <div style={{ height: "100vh" }}>
      <button
        onClick={() => setMapType(mapType === "leaflet" ? "cesium" : "leaflet")}
      >
        Toggle Map Type
      </button>

      {mapType === "leaflet" ? <LeafletMap /> : <CesiumMap />}
    </div>
  );
};

export default MapComponent;
