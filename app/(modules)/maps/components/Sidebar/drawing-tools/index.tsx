"use client";

import { useAtom } from "jotai";
import { MapPinIcon, SlashIcon, Scale3DIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { mapAtom } from "../../../state/map";
import L, { DrawMap } from "leaflet";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

export const DrawingTools = () => {
  const [map] = useAtom(mapAtom);
  const [activeTab, setActiveTab] = useState<
    "location" | "edit" | "expand" | null
  >(null);

  // Refs untuk menyimpan instance drawing tools dan layer group
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const drawingToolsRef = useRef<{
    marker: L.Draw.Marker | null;
    polyline: L.Draw.Polyline | null;
    polygon: L.Draw.Polygon | null;
  }>({
    marker: null,
    polyline: null,
    polygon: null,
  });

  // Inisialisasi layer group dan events
  useEffect(() => {
    if (!map) return;

    // Buat FeatureGroup untuk items yang digambar
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    drawnItemsRef.current = drawnItems;

    // Inisialisasi drawing tools
    drawingToolsRef.current = {
      marker: new L.Draw.Marker(map as DrawMap, {
        icon: new L.Icon.Default(),
      }),
      polyline: new L.Draw.Polyline(map as DrawMap, {
        shapeOptions: {
          color: "#3388ff",
          weight: 4,
          opacity: 0.7,
        },
      }),
      polygon: new L.Draw.Polygon(map as DrawMap, {
        shapeOptions: {
          color: "#f03",
          fillColor: "#f03",
          fillOpacity: 0.3,
          weight: 3,
        },
        showArea: true,
      }),
    };

    // Menangani event ketika objek selesai digambar
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map.on(L.Draw.Event.CREATED, function (e: any) {
      const layer = e.layer;

      // Tambahkan layer ke drawnItems
      drawnItems.addLayer(layer);

      // Tambahkan popup informasi berdasarkan tipe layer
      if (layer instanceof L.Marker) {
        addMarkerPopup(layer);
      } else if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
        addPolylinePopup(layer);
      } else if (layer instanceof L.Polygon) {
        addPolygonPopup(layer);
      }
    });

    // Cleanup event listeners ketika component unmount
    return () => {
      if (map) {
        map.off(L.Draw.Event.CREATED);
        if (drawnItems) {
          map.removeLayer(drawnItems);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  // Fungsi untuk menambahkan popup ke marker
  const addMarkerPopup = (marker: L.Marker) => {
    const latlng = marker.getLatLng();
    marker.bindPopup(`
      <div class="popup-content">
        <strong>Lokasi:</strong><br>
        Lat: ${latlng.lat.toFixed(6)}<br>
        Lng: ${latlng.lng.toFixed(6)}
      </div>
    `);
  };

  // Fungsi untuk menambahkan popup ke polyline
  const addPolylinePopup = (polyline: L.Polyline) => {
    const latlngs = polyline.getLatLngs() as L.LatLng[];
    const distance = calculateDistance(latlngs);

    polyline.bindPopup(`
      <div class="popup-content">
        <strong>Garis:</strong><br>
        Jarak: ${distance.toFixed(3)} km<br>
        Titik: ${latlngs.length}
      </div>
    `);
  };

  // Fungsi untuk menambahkan popup ke polygon
  const addPolygonPopup = (polygon: L.Polygon) => {
    const latlngs = polygon.getLatLngs()[0] as L.LatLng[];
    const perimeter = calculateDistance(latlngs);
    const area = calculateArea(latlngs);

    polygon.bindPopup(`
      <div class="popup-content">
        <strong>Area:</strong><br>
        Luas: ${area.toFixed(3)} km²<br>
        Keliling: ${perimeter.toFixed(3)} km<br>
        Titik: ${latlngs.length}
      </div>
    `);
  };

  // Fungsi utilitas untuk menghitung jarak dari polyline dalam kilometer
  const calculateDistance = (latlngs: L.LatLng[]): number => {
    let totalDistance = 0;
    for (let i = 0; i < latlngs.length - 1; i++) {
      totalDistance += latlngs[i].distanceTo(latlngs[i + 1]);
    }
    return totalDistance / 1000; // Konversi meter ke kilometer
  };

  // Fungsi utilitas untuk menghitung luas area dari polygon dalam kilometer persegi
  const calculateArea = (latlngs: L.LatLng[]): number => {
    // Tambahkan titik pertama ke akhir untuk menutup polygon jika perlu
    const closedLatLngs = [...latlngs];
    if (latlngs.length > 0 && !latlngs[0].equals(latlngs[latlngs.length - 1])) {
      closedLatLngs.push(latlngs[0]);
    }

    let area = 0;
    const R = 6371; // radius bumi dalam km

    if (closedLatLngs.length < 3) {
      return 0;
    }

    for (let i = 0; i < closedLatLngs.length - 1; i++) {
      const p1 = closedLatLngs[i];
      const p2 = closedLatLngs[i + 1];

      const dLon = ((p2.lng - p1.lng) * Math.PI) / 180;

      const lat1 = (p1.lat * Math.PI) / 180;
      const lat2 = (p2.lat * Math.PI) / 180;

      area +=
        2 *
        Math.atan2(
          Math.sin(dLon) * Math.cos(lat2),
          Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)
        );
    }

    area = Math.abs(area * R * R); // area dalam kilometer persegi
    return area;
  };

  // Handler untuk tab click
  const handleTabClick = (tab: "location" | "edit" | "expand") => {
    // Batalkan operasi drawing yang sedang berjalan
    if (map) {
      // @ts-expect-error - API typings might not include this
      if (map.pm && map.pm.Draw) map.pm.Draw.disable();
      map.fire("draw:drawstop");
    }

    // Toggle active tab
    setActiveTab((prevTab) => {
      if (prevTab === tab) {
        return null;
      }
      return tab;
    });

    // Jika tab dinonaktifkan, tidak perlu memulai drawing baru
    if (activeTab === tab) {
      return;
    }

    // Aktifkan drawing tool sesuai tab
    if (drawingToolsRef.current) {
      switch (tab) {
        case "location":
          drawingToolsRef.current.marker?.enable();
          break;
        case "edit":
          drawingToolsRef.current.polyline?.enable();
          break;
        case "expand":
          drawingToolsRef.current.polygon?.enable();
          break;
      }
    }
  };

  // Reset semua item yang digambar
  const handleReset = () => {
    setActiveTab(null);

    // Batalkan operasi drawing yang sedang berjalan
    if (map) {
      // @ts-expect-error - API typings might not include this
      if (map.pm && map.pm.Draw) map.pm.Draw.disable();
      map.fire("draw:drawstop");
    }

    // Hapus semua layer
    if (drawnItemsRef.current) {
      drawnItemsRef.current.clearLayers();
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className="grid grid-cols-3 bg-zinc-100 rounded-lg p-1">
        <button
          className={`flex items-center justify-center py-1 ${
            activeTab === "location" ? "bg-zinc-300" : ""
          }`}
          onClick={() => handleTabClick("location")}
          aria-label="Location"
        >
          <MapPinIcon className="w-4 h-4 text-zinc-500" />
        </button>

        <button
          className={`flex items-center justify-center py-1 ${
            activeTab === "edit" ? "bg-zinc-300" : ""
          }`}
          onClick={() => handleTabClick("edit")}
          aria-label="Edit"
        >
          <SlashIcon className="w-4 h-4 text-zinc-500" />
        </button>

        <button
          className={`flex items-center justify-center py-1 ${
            activeTab === "expand" ? "bg-zinc-300" : ""
          }`}
          onClick={() => handleTabClick("expand")}
          aria-label="Expand"
        >
          <Scale3DIcon className="w-4 h-4 text-zinc-500" />
        </button>
      </div>

      <button
        className="w-full bg-zinc-100 rounded-lg py-2 px-4 text-zinc-600 hover:bg-zinc-200 transition-colors"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};
