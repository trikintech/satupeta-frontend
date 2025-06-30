import { ChoroplethIcon, MapIcon } from "@/shared/components/icons";
import { ActiveLayer } from "../../../../state/active-layers";
import { setLayerModeAtom } from "../../../../state/active-layers";
import { useAtom, useSetAtom } from "jotai";
import { constructWfsUrl } from "@/shared/utils/wms";
import colorScaleApi from "@/shared/services/color-scale";
import { appConfig } from "@/shared/config/app-config";
import { useQuery } from "@tanstack/react-query";
import { mergeDataToGeoJSON } from "@/shared/utils/mege-data-geojson";
import { FeatureCollection, Geometry } from "geojson";
import jatimGeojson from "@/public/jatim.json";
import L from "leaflet";
import { mapAtom } from "@/app/(modules)/maps/state/map";
import { leafletLayerInstancesAtom } from "@/app/(modules)/maps/state/leaflet-layer-instances";

interface ChoropleControlProps {
  layer: ActiveLayer;
}
export default function ChoroplethControl({ layer }: ChoropleControlProps) {
  const setLayerMode = useSetAtom(setLayerModeAtom);
  const [map] = useAtom(mapAtom);
  const sourceUrl = constructWfsUrl(layer.layer) as string;
  const [layerInstances, setLayerInstances] = useAtom(
    leafletLayerInstancesAtom
  );
  const { data: colorScale } = useQuery({
    queryKey: ["color-scale", layer.id],
    queryFn: () =>
      colorScaleApi
        .getColorScale({
          source_url: sourceUrl,
          boundary_file_id: appConfig.boundaryFileId,
        })
        .then((res) => res),
    staleTime: 5000,
  });

  const changeToColorpleth = () => {
    if (!colorScale?.data) return;
    if (!map) return;
    const existingLayer = layerInstances.get(layer.id);

    if (existingLayer) map.removeLayer(existingLayer);

    const enrichedGeoJSON = mergeDataToGeoJSON(
      jatimGeojson as FeatureCollection<Geometry, Record<string, unknown>>,
      colorScale.data
    );

    const leafletLayer = L.geoJSON(enrichedGeoJSON, {
      style: (feature) => ({
        fillColor: feature?.properties?.color || "#cccccc",
        weight: 2,
        color: "#333333",
        fillOpacity: 0.7,
      }),
      onEachFeature: (feature, layerInstance) => {
        const props = feature.properties;
        layerInstance.bindPopup(
          `<strong>${props.WADMKK}, ${props.WADMPR}</strong><br>Value: ${props.value}`
        );
      },
    });

    leafletLayer.addTo(map);
    const newMap = new Map(layerInstances);
    newMap.set(layer.id, leafletLayer);

    setLayerInstances(newMap);
  };

  return (
    <div className="bg-zinc-100 p-1 grid grid-cols-2 space-x-1">
      <button
        className="bg-white cursor-pointer rounded-md flex flex-col gap-1 justify-center items-center text-sm text-zinc-950 py-2 px-3"
        onClick={() => setLayerMode({ layerId: layer.id, mode: "basic" })}
      >
        <MapIcon size={32} />
        Basic
      </button>
      <button
        className="bg-white cursor-pointer rounded-md flex flex-col gap-1 justify-center items-center text-sm text-zinc-950 py-2 px-3"
        onClick={() => changeToColorpleth()}
      >
        <ChoroplethIcon size={32} />
        Choropleth
      </button>
    </div>
  );
}
