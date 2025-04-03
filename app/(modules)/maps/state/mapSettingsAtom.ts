import { atom } from "jotai";

import { mapConfig } from "../config/mapConfig";

export const mapSettingsAtom = atom({
  center: mapConfig.center,
  zoomLevel: mapConfig.zoomLevel,
});
