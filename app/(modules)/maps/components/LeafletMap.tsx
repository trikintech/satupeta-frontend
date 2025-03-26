"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";

const LeafletMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: L.Map | null = null;

    if (mapContainer.current) {
      // Initialize map only if container exists and doesn't have a map already
      map = L.map(mapContainer.current).setView([51.505, -0.09], 13);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Store map instance for cleanup
      return () => {
        if (map) {
          map.remove();
          map = null;
        }
      };
    }
  }, []); // Empty dependency array means this runs once on mount

  return <div ref={mapContainer} style={{ height: "100%", width: "100%" }} />;
};

export default LeafletMap;
