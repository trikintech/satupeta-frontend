import { atom } from "jotai";

import L from "leaflet";

export const leafletLayerInstancesAtom = atom<Map<string, L.Layer>>(new Map());
