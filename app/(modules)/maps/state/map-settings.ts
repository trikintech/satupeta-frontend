import { mapConfig } from "@/shared/config/map-config";

import { atom } from "jotai";

export const mapSettingsAtom = atom({
  center: mapConfig.center,
  zoomLevel: mapConfig.zoomLevel,
});
