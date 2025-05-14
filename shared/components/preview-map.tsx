import { MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";
import { mapConfig } from "../config/map-config";
import { Mapset } from "@/shared/types/mapset";
import { parseWmsUrl } from "../utils/wms";
import { LatLngBoundsExpression } from "leaflet";

export default function PreviewMap({
  mapset,
  isActiveControl,
  centerCustom,
}: Readonly<{
  mapset: Mapset;
  isActiveControl?: boolean;
  centerCustom?: [number, number];
}>) {
  const parsed = parseWmsUrl(mapset?.layer_url);
  const bounds = parsed?.params.bounds as LatLngBoundsExpression | undefined;

  // Add a fallback center and zoom
  const center: [number, number] = centerCustom ?? [
    mapConfig.center[0],
    mapConfig.center[1],
  ];
  const zoom = 8;

  return (
    <MapContainer
      {...(bounds ? { bounds } : { center, zoom })} // Use bounds if available, otherwise fallback to center and zoom
      className="h-full w-full"
      style={{ height: "100%", width: "100%" }} // Add explicit style
      attributionControl={isActiveControl ?? false}
      zoomControl={isActiveControl ?? false}
      scrollWheelZoom={isActiveControl ?? false}
      dragging={isActiveControl ?? false}
      doubleClickZoom={isActiveControl ?? false}
      keyboard={isActiveControl ?? false}
      touchZoom={isActiveControl ?? false}
      boxZoom={isActiveControl ?? false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {parsed && (
        <WMSTileLayer
          key={parsed.baseUrl + parsed.params.layers}
          url={parsed.baseUrl}
          layers={parsed.params.layers}
          styles={parsed.params.styles}
          format="image/png"
          transparent={true}
          version={parsed.params.version}
        />
      )}
    </MapContainer>
  );
}
