"use client";

import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { activeBasemapAtom } from "../state/activeBasemapAtom";
import { basemapConfig } from "../config/basemapConfig";

import { MapContainer } from "react-leaflet";
import L from "leaflet";

const LeafletMap: React.FC = () => {
  const activeBasemap = useAtomValue(activeBasemapAtom);
  const [basemapLayer, setBasemapLayer] = useState<L.Layer | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    if (!map) return;

    const currentConfig = basemapConfig[activeBasemap];
    if (!currentConfig?.leaflet) {
      console.error(
        `Missing Leaflet configuration for basemap: ${activeBasemap}`
      );
      return;
    }

    if (!basemapLayer) {
      const newLayer = L.tileLayer(currentConfig.leaflet.url, {
        attribution: currentConfig.leaflet.attribution,
        maxZoom: currentConfig.leaflet.maxZoom,
      });

      if (newLayer) {
        setBasemapLayer(newLayer);
        map?.addLayer(newLayer);
      }
    } else {
      basemapLayer.addTo(map);
    }
  }, [map, basemapLayer, activeBasemap]);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      ref={setMap}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default LeafletMap;
