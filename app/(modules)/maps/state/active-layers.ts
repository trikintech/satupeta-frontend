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

export type Source = {
  id: number | string;
  source: string;
};

export type ActiveLayer = {
  id: string;
  name: string;
  source: Source;
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

export const reorderLayersAtom = atom(
  null,
  (
    get,
    set,
    { fromIndex, toIndex }: { fromIndex: number; toIndex: number }
  ) => {
    const layers = [...get(activeLayersAtom)];
    const [moved] = layers.splice(fromIndex, 1);
    layers.splice(toIndex, 0, moved);

    const updated = layers.map((layer, index) => ({
      ...layer,
      settings: {
        ...layer.settings,
        zIndex: index + 1,
      },
    }));

    set(activeLayersAtom, updated);
  }
);

export const enableAllLayersAtom = atom(null, (get, set) => {
  set(activeLayersAtom, (prev) =>
    prev.map((layer) => ({
      ...layer,
      settings: { ...layer.settings, visible: true },
    }))
  );
});

export const disableAllLayersAtom = atom(null, (get, set) => {
  set(activeLayersAtom, (prev) =>
    prev.map((layer) => ({
      ...layer,
      settings: { ...layer.settings, visible: false },
    }))
  );
});

export const toggleAllLayersAtom = atom(null, (get, set) => {
  const allVisible = get(activeLayersAtom).every(
    (layer) => layer.settings.visible
  );
  set(activeLayersAtom, (prev) =>
    prev.map((layer) => ({
      ...layer,
      settings: { ...layer.settings, visible: !allVisible },
    }))
  );
});

export const allLayersVisibleAtom = atom((get) =>
  get(activeLayersAtom).every((layer) => layer.settings.visible)
);

export const anyLayersVisibleAtom = atom((get) =>
  get(activeLayersAtom).some((layer) => layer.settings.visible)
);

export const removeAllLayersAtom = atom(null, (get, set) => {
  set(activeLayersAtom, []); // Clear all layers from the activeLayersAtom
});
