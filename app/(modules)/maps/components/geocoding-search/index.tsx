import { useState } from "react";
import { useAtom } from "jotai";
import { mapAtom } from "../../state/map";
import L from "leaflet";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import SearchInput from "@/shared/components/search-input";
import { useSetAtom } from "jotai";
import { isOpenMapsetDialogAtom } from "../../state/mapset-dialog";

interface GeocodingResult {
  address: string;
  location: {
    x: number;
    y: number;
  };
  score: number;
}

// const SPATIAL_EXTENT = {
//   xmin: (111.5 * 20037508.34) / 180, // West boundary
//   ymin: (-8.5 * 20037508.34) / 180, // South boundary
//   xmax: (114.5 * 20037508.34) / 180, // East boundary
//   ymax: (-6.5 * 20037508.34) / 180, // North boundary
//   spatialReference: { wkid: 102100 },
// };

export default function GeocodingSearch() {
  const [map] = useAtom(mapAtom);
  const [input, setInput] = useState("");
  const [locations, setLocations] = useState<GeocodingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [markers, setMarkers] = useState<L.Marker[]>([]);
  const setIsOpenDialog = useSetAtom(isOpenMapsetDialogAtom);

  const handleChange = async (val: string) => {
    setInput(val);

    if (!val.trim()) {
      setLocations([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ARCGIS_GEOCODESERVER}/findAddressCandidates?` +
          new URLSearchParams({
            f: "json",
            singleLine: val,
            outFields: "Match_addr,Addr_type",
            maxLocations: "5",
            // searchExtent: JSON.stringify(SPATIAL_EXTENT),
          })
      );

      const data = await response.json();
      setLocations(data.candidates || []);
    } catch (error) {
      console.error("Error searching address:", error);
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (location: GeocodingResult) => {
    if (!map) return;

    // Clear existing markers
    markers.forEach((marker) => marker.remove());
    const newMarkers: L.Marker[] = [];

    const marker = L.marker([location.location.y, location.location.x])
      .addTo(map)
      .bindPopup(location.address);

    newMarkers.push(marker);
    setMarkers(newMarkers);

    // Center map on selected location
    map.setView([location.location.y, location.location.x], 15);

    // Clear locations list
    setLocations([]);
  };

  return (
    <div className="relative">
      <div className="relative">
        <SearchInput
          value={input}
          onChange={(val) => handleChange(val)}
          placeholder="Cari Lokasi/Dataset"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          </div>
        )}
      </div>
      {locations.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="p-2">
            <Button
              onClick={() => setIsOpenDialog(true)}
              className="w-full mb-2"
              size="sm"
            >
              Cari {input ? `"${input}"` : "Data"} di Katalog Mapset
            </Button>
            <div className="text-sm text-gray-500">
              Lokasi ({locations.length})
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {locations.map((location, index) => (
              <button
                key={index}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none"
                onClick={() => handleLocationSelect(location)}
              >
                {location.address}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
