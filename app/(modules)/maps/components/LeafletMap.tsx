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

    if (basemapLayer) {
      map.removeLayer(basemapLayer);
    }

    const newLayer = L.tileLayer(currentConfig.leaflet.url, {
      attribution: currentConfig.leaflet.attribution,
      maxZoom: currentConfig.leaflet.maxZoom,
    });

    setBasemapLayer(newLayer);
    map.addLayer(newLayer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, activeBasemap]);

  return (
    <MapContainer
      center={[-7.5361, 112.2384]}
      zoom={8}
      zoomControl={false}
      ref={setMap}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default LeafletMap;
