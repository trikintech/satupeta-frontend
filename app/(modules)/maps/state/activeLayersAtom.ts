import { atom } from "jotai";

import { LatLngBoundsExpression } from "leaflet";

type LayerSettings = {
  visible: boolean;
  opacity: number;
  zIndex: number;
};

export type WMSLayerConfig = {
  type: "wms";
  url?: string;
  layers?: string;
  format?: string;
  transparent?: boolean;
  bounds?: LatLngBoundsExpression | null;
};

export type ActiveLayer = {
  id: string;
  name: string;
  settings: LayerSettings;
  layer: WMSLayerConfig;
};

export const activeLayersAtom = atom<ActiveLayer[]>([]);

export const addLayerAtom = atom(
  null,
  (get, set, layer: Omit<ActiveLayer, "settings">) => {
    set(activeLayersAtom, [
      ...get(activeLayersAtom),
      {
        ...layer,
        settings: {
          visible: true,
          opacity: 1,
          zIndex: get(activeLayersAtom).length + 1,
        },
      },
    ]);
  }
);

export const toggleLayerAtom = atom(null, (get, set, layerId: string) => {
  set(activeLayersAtom, (prev) =>
    prev.map((layer) =>
      layer.id === layerId
        ? {
            ...layer,
            settings: { ...layer.settings, visible: !layer.settings.visible },
          }
        : layer
    )
  );
});

export const removeLayerAtom = atom(null, (get, set, layerId: string) => {
  set(activeLayersAtom, (prev) => prev.filter((layer) => layer.id !== layerId));
});

export const setLayerOpacityAtom = atom(
  null,
  (get, set, { layerId, opacity }: { layerId: string; opacity: number }) => {
    set(activeLayersAtom, (prev) =>
      prev.map((layer) =>
        layer.id === layerId
          ? { ...layer, settings: { ...layer.settings, opacity } }
          : layer
      )
    );
  }
);
