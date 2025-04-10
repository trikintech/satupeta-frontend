import { atom } from "jotai";

import { mapConfig } from "../config/map-config";

export const mapSettingsAtom = atom({
  center: mapConfig.center,
  zoomLevel: mapConfig.zoomLevel,
});
