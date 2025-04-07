import { useAtom } from "jotai";
import { Mapset } from "../types/Mapset";
import {
  activeLayersAtom,
  addLayerAtom,
  removeLayerAtom,
} from "../state/activeLayersAtom";
import { isOpenMapsetDialogAtom } from "../state/mapsetDialogAtom";
import { parseWmsUrl } from "../utils/wmsUtils";

export function useLayerToggle(mapset: Mapset) {
  const [activeLayers] = useAtom(activeLayersAtom);
  const [, addLayer] = useAtom(addLayerAtom);
  const [, removeLayer] = useAtom(removeLayerAtom);
  const [, setIsOpenDialog] = useAtom(isOpenMapsetDialogAtom);

  const isActive = activeLayers.some((layer) => layer.id === mapset.id);

  const toggleLayer = () => {
    if (isActive) {
      removeLayer(mapset.id);
    } else {
      const parsed = parseWmsUrl(mapset?.mapsetservice_url);

      addLayer({
        id: mapset.id,
        name: mapset.name,
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
    isActive,
    toggleLayer,
  };
}
