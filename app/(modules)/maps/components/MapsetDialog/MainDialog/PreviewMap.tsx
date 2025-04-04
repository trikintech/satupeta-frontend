import { MapContainer, TileLayer } from "react-leaflet";
import { mapConfig } from "../../../config/mapConfig";

export default function PreviewMap() {
  return (
    <MapContainer
      center={[mapConfig.center[0], mapConfig.center[1]]}
      zoom={7}
      zoomControl={false}
      attributionControl={false}
      className="h-64 w-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}
