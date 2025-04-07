import { MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";
import { mapConfig } from "../../../config/mapConfig";
import { parseWmsUrl } from "../../../utils/wmsUtils";
import { Mapset } from "../../../types/Mapset";

export default function PreviewMap({ mapset }: Readonly<{ mapset: Mapset }>) {
  const parsed = parseWmsUrl(mapset?.mapsetservice_url);

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
      {parsed && (
        <WMSTileLayer
          key={parsed.baseUrl + parsed.params.layers}
          url={parsed.baseUrl}
          layers={parsed.params.layers}
          styles={parsed.params.styles}
          format={`image/png`}
          transparent
          version={parsed.params.version}
        />
      )}
    </MapContainer>
  );
}
