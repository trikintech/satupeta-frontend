import { atom } from "jotai";

type LayerSettings = {
  opacity: number;
  visible: boolean;
  zIndex: number;
};

type WMSTileLayer = {
  type: "wms";
  url: string;
  layers: string;
};

type ActiveLayer = {
  id: string;
  name: string;
  settings: LayerSettings;
  layer: WMSTileLayer;
};

export const activeLayersAtom = atom<ActiveLayer[]>([]);

export const activeLayerIdsAtom = atom((get) =>
  get(activeLayersAtom).map((layer) => layer.id)
);

export const visibleLayersAtom = atom((get) =>
  get(activeLayersAtom).filter((layer) => layer.settings.visible)
);

export const addActiveLayerAtom = atom(null, (get, set, layer: ActiveLayer) => {
  const current = get(activeLayersAtom);
  set(activeLayersAtom, [...current, layer]);
});

export const removeActiveLayerAtom = atom(null, (get, set, layerId: string) => {
  const current = get(activeLayersAtom);
  set(
    activeLayersAtom,
    current.filter((layer) => layer.id !== layerId)
  );
});

export const updateLayerSettingsAtom = atom(
  null,
  (
    get,
    set,
    { layerId, settings }: { layerId: string; settings: Partial<LayerSettings> }
  ) => {
    const current = get(activeLayersAtom);
    set(
      activeLayersAtom,
      current.map((layer) =>
        layer.id === layerId
          ? { ...layer, settings: { ...layer.settings, ...settings } }
          : layer
      )
    );
  }
);
