"use client";

import React from "react";
import { useAtom } from "jotai";
import { mapTypeAtom } from "../state/mapTypeAtom";
import { CesiumMap } from "./CesiumMap";
import dynamic from "next/dynamic";
import MapSettings from "./MapSettings";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });
const MemoizedLeafletMap = React.memo(LeafletMap);

const MapComponent: React.FC = () => {
  const [mapType] = useAtom(mapTypeAtom);

  return (
    <div style={{ height: "100vh" }} className="relative">
      <div className=""></div>
      <MapSettings />

      {mapType === "leaflet" ? <MemoizedLeafletMap /> : <CesiumMap />}
    </div>
  );
};

export default MapComponent;
