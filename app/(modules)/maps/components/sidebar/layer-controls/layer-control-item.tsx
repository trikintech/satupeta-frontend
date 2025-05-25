import { useState, useEffect } from "react";
import { GripHorizontal, ChevronUp, Eye, EyeOff } from "lucide-react";
import L from "leaflet";
import { useAtom } from "jotai";
import {
  isOpenMapsetDialogAtom,
  selectedMapsetAtom,
} from "../../../state/mapset-dialog";
import { useQuery } from "@tanstack/react-query";
import {
  ActiveLayer,
  removeLayerAtom,
  toggleLayerAtom,
} from "../../../state/active-layers";
import { mapAtom } from "../../../state/map";
import mapsetApi from "@/shared/services/mapset";
import { LegendDisplay } from "./legend-display";
import { OpacityControl } from "./opacity-control";
import { LayerActions } from "./layer-actions";
import ChoroplethControl from "./choropleth-control";

interface LayerControlItemProps {
  layer: ActiveLayer;
  layerInstance?: L.Layer;
  onZoom: (bounds?: L.LatLngBoundsExpression | null) => void;
}

const checkPointLayer = async (
  layerName: string,
  baseUrl: string
): Promise<boolean> => {
  try {
    // Extract the base layer name without namespace
    const baseLayerName = layerName.split(":").pop() || layerName;

    // Directly fetch a single feature using WFS
    const getFeatureUrl = `${baseUrl}?service=WFS&version=1.1.0&request=GetFeature&typeName=${baseLayerName}&maxFeatures=1&outputFormat=application/json`;
    const featureResponse = await fetch(getFeatureUrl);
    if (!featureResponse.ok) return false;

    const featureData = await featureResponse.json();
    if (featureData.features && featureData.features.length > 0) {
      const geometryType =
        featureData.features[0].geometry?.type?.toLowerCase();
      return geometryType === "point" || geometryType === "multipoint";
    }

    return false;
  } catch (error) {
    console.error("Error checking layer geometry type:", error);
    return false;
  }
};

export const LayerControlItem = ({
  layer,
  layerInstance,
  onZoom,
}: LayerControlItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [isPointLayer, setIsPointLayer] = useState(false);
  const [, setIsOpenDialog] = useAtom(isOpenMapsetDialogAtom);
  const [, setSelectedMapset] = useAtom(selectedMapsetAtom);
  const [, removeLayer] = useAtom(removeLayerAtom);
  const [, toggleLayer] = useAtom(toggleLayerAtom);
  const { data: mapsets } = useQuery({
    queryKey: ["mapsets"],
    queryFn: () =>
      mapsetApi.getMapsets().then((res) => {
        return res.items;
      }),
  });
  const [map] = useAtom(mapAtom);

  useEffect(() => {
    const checkLayer = async () => {
      if (layer.layer.layers && layer.layer.url) {
        const isPoint = await checkPointLayer(
          layer.layer.layers,
          layer.layer.url
        );
        setIsPointLayer(isPoint);
      }
    };

    checkLayer();
  }, [layer.layer.layers, layer.layer.url]);

  const handleOpacityChange = (value: number[]) => {
    if (layerInstance && layerInstance instanceof L.TileLayer.WMS) {
      layerInstance.setOpacity(value[0]);
    }
    setOpacity(value[0]);
  };

  const handleInfo = () => {
    if (!mapsets) return;

    const foundMapset = mapsets.find((mapset) => mapset.id === layer.source.id);

    if (foundMapset) {
      setSelectedMapset(foundMapset);
      setIsOpenDialog(true);
    } else {
      console.warn("Mapset not found for this layer:", layer.id);
    }
  };

  const handleToggleVisibility = () => {
    if (!map) return;

    toggleLayer(layer.id);
    if (layerInstance) {
      if (layer.settings.visible) {
        layerInstance.remove();
      } else {
        layerInstance.addTo(map);
      }
    }
  };

  function toLatLngBounds(bounds: L.LatLngBoundsExpression): L.LatLngBounds {
    if ("getSouthWest" in bounds && "getNorthEast" in bounds) {
      return bounds as L.LatLngBounds;
    }
    return L.latLngBounds(bounds as L.LatLngExpression[]);
  }

  const handleDownloadImage = () => {
    if (!layer.layer.url || !layer.layer.layers) return;

    const rawBounds = layer.layer.bounds ?? map?.getBounds() ?? null;
    if (!rawBounds) return;

    const bounds = toLatLngBounds(rawBounds);
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();

    const bbox = [
      southWest.lng,
      southWest.lat,
      northEast.lng,
      northEast.lat,
    ].join(",");

    const width = 1024;
    const height = 768;

    const downloadUrl = `${layer.layer.url}?service=WMS&version=1.1.1&request=GetMap&layers=${layer.layer.layers}&styles=&bbox=${bbox}&width=${width}&height=${height}&srs=EPSG:4326&format=image/png&transparent=true`;

    window.open(downloadUrl, "_blank");
  };

  return (
    <div className="bg-muted rounded-lg border border-primary p-3">
      <div className="cursor-pointer w-full flex items-center justify-between text-sm">
        <div className="flex flex-1 items-center gap-2">
          <button className="cursor-pointer self-start mt-0.5">
            <GripHorizontal className="w-4 h-4 text-zinc-950"></GripHorizontal>
          </button>
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`text-left text-zinc-700 text-sm cursor-pointer ${
              !isExpanded && "line-clamp-1"
            }`}
          >
            {layer.name}
          </button>
        </div>

        {!isExpanded && (
          <button
            onClick={handleToggleVisibility}
            className="cursor-pointer flex items-center justify-center"
            title={layer.settings.visible ? "Hide layer" : "Show layer"}
          >
            {layer.settings.visible ? (
              <Eye className="h-4 w-4 text-zinc-950" />
            ) : (
              <EyeOff className="h-4 w-4 text-zinc-950" />
            )}
          </button>
        )}

        {!isExpanded && (
          <div className="border-l border-gray-300 h-4 mx-2"></div>
        )}

        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center justify-center shrink-0 self-start mt-0.5"
        >
          {isExpanded ? (
            <ChevronUp
              size={12}
              className="h-4 w-4 rotate-0 shrink-0 text-zinc-950"
            />
          ) : (
            <ChevronUp size={12} className="rotate-180 h-4 w-4 text-zinc-950" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-3 mt-3">
          <LegendDisplay layer={layer} />
          <LayerActions
            layer={layer}
            onZoom={onZoom}
            onInfo={handleInfo}
            onRemove={() => removeLayer(layer.id)}
            onDownload={handleDownloadImage}
          />
          <OpacityControl
            opacity={opacity}
            onOpacityChange={handleOpacityChange}
          />

          {isPointLayer && <ChoroplethControl />}
        </div>
      )}
    </div>
  );
};
