"use client";

import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { mapAtom } from "../../state/map";
import { mapTypeAtom } from "../../state/map-type";
import { activeBasemapAtom } from "../../state/active-basemap";
import { basemapConfig } from "../../config/basemap-config";
import L from "leaflet";
import ScaleBar from "./scale-bar";

const Footer: React.FC = () => {
  const map = useAtomValue(mapAtom);
  const mapType = useAtomValue(mapTypeAtom);
  const activeBasemap = useAtomValue(activeBasemapAtom);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (!map || mapType !== "leaflet") return;

    const updateCoordinates = (e: L.LeafletMouseEvent) => {
      setCoordinates({
        lat: Number(e.latlng.lat.toFixed(6)),
        lng: Number(e.latlng.lng.toFixed(6)),
      });
    };

    map.on("mousemove", updateCoordinates);

    return () => {
      map.off("mousemove", updateCoordinates);
    };
  }, [map, mapType]);

  const attribution = basemapConfig[activeBasemap]?.leaflet?.attribution || "";

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 p-2 text-xs z-[402] text-zinc-400">
      <div className="flex justify-between items-center">
        <div
          className="attribution"
          dangerouslySetInnerHTML={{
            __html: `<a href="https://leafletjs.com/" target="_blank" rel="noreferrer">Leaflet</a> | ${attribution}`,
          }}
        />
        <div className="flex items-center space-x-8 ">
          <div className="coordinates">Lat: {coordinates.lat}</div>
          <div className="coordinates">Lng: {coordinates.lng}</div>
          {mapType === "leaflet" && <ScaleBar />}
        </div>
      </div>
    </div>
  );
};

export default Footer;
