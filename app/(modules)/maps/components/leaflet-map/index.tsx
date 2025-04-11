"use client";

import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { activeBasemapAtom } from "../../state/active-basemap";
import { basemapConfig } from "../../config/basemap-config";

import { MapContainer } from "react-leaflet";
import L from "leaflet";
import { mapAtom } from "../../state/map";
import { mapSettingsAtom } from "../../state/map-settings";
import ZoomControl from "./zoom-control";
import { LayerManager } from "../layer-manager";

const LeafletMap: React.FC = () => {
  const activeBasemap = useAtomValue(activeBasemapAtom);
  const [basemapLayer, setBasemapLayer] = useState<L.Layer | null>(null);
  const [map, setMap] = useAtom(mapAtom);
  const [mapSettings] = useAtom(mapSettingsAtom);

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
    newLayer.bringToBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, activeBasemap]);

  return (
    <>
      <MapContainer
        center={[mapSettings.center[0], mapSettings.center[1]]}
        zoom={8}
        zoomControl={false}
        ref={setMap}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
      />
      <LayerManager map={map} />
      <ZoomControl />
    </>
  );
};

export default LeafletMap;
