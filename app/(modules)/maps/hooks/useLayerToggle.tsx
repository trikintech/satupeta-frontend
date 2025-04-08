import { useAtom } from "jotai";
import {
  activeLayersAtom,
  addLayerAtom,
  removeLayerAtom,
} from "../state/activeLayersAtom";
import { isOpenMapsetDialogAtom } from "../state/mapsetDialogAtom";
import { parseWmsUrl } from "../utils/wmsUtils";
import { Mapset } from "@/shared/types/mapset";

export function useLayerToggle(mapset: Mapset) {
  const [activeLayers] = useAtom(activeLayersAtom);
  const [, addLayer] = useAtom(addLayerAtom);
  const [, removeLayer] = useAtom(removeLayerAtom);
  const [, setIsOpenDialog] = useAtom(isOpenMapsetDialogAtom);

  const isActiveLayer = activeLayers.find(
    (layer) => layer.source.id === mapset.id
  );

  const toggleLayer = () => {
    if (isActiveLayer) {
      removeLayer(isActiveLayer.id);
    } else {
      const parsed = parseWmsUrl(mapset?.mapsetservice_url);

      addLayer({
        id: "db_" + mapset.id,
        name: mapset.name,
        source: {
          id: mapset.id,
          source: "db",
        },
        layer: {
          type: "wms",
          url: parsed?.baseUrl,
          layers: parsed?.params.layers,
          format: "image/png",
          transparent: false,
          bounds: parsed?.params.bounds,
        },
      });
    }

    setIsOpenDialog(false);
  };

  return {
    isActiveLayer,
    toggleLayer,
  };
}
