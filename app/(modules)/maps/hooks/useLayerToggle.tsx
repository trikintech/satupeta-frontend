import { useAtom } from "jotai";
import {
  activeLayersAtom,
  addLayerAtom,
  removeLayerAtom,
} from "../state/active-layers";
import { isOpenMapsetDialogAtom } from "../state/mapset-dialog";
import { getWmsLayerBounds, parseWmsUrl } from "../../../../shared/utils/wms";
import { Mapset } from "@/shared/types/mapset";

export function useLayerToggle(mapset: Mapset) {
  const [activeLayers] = useAtom(activeLayersAtom);
  const [, addLayer] = useAtom(addLayerAtom);
  const [, removeLayer] = useAtom(removeLayerAtom);
  const [, setIsOpenDialog] = useAtom(isOpenMapsetDialogAtom);

  const isActiveLayer = activeLayers.find(
    (layer) => layer.source.id === mapset.id
  );

  const toggleLayer = async () => {
    if (isActiveLayer) {
      removeLayer(isActiveLayer.id);
    } else {
      const parsed = parseWmsUrl(mapset?.layer_url);

      const layerData = {
        id: "db_" + mapset.id,
        name: mapset.name,
        source: {
          id: mapset.id,
          source: "db",
        },
        layer: {
          type: "wms" as const,
          url: parsed?.baseUrl,
          layers: parsed?.params.layers,
          format: "image/png",
          transparent: false,
          bounds: parsed?.params.bounds,
        },
      };

      // Get bounds if URL and layer name are available
      if (parsed?.baseUrl && parsed?.params.layers && !parsed?.params.bounds) {
        const bounds = await getWmsLayerBounds(
          parsed.baseUrl,
          parsed.params.layers
        );
        if (bounds) {
          layerData.layer.bounds = bounds;
        }
      }

      addLayer(layerData);
    }

    setIsOpenDialog(false);
  };

  return {
    isActiveLayer,
    toggleLayer,
  };
}
