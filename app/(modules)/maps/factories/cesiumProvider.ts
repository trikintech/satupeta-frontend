import * as Cesium from "cesium";

import { CesiumConfig } from "../types/basemapConfig.types";

export const createCesiumProvider = (config: CesiumConfig) => {
  switch (config.type) {
    case "OpenStreetMapImageryProvider":
      return new Cesium.OpenStreetMapImageryProvider(config.options);

    case "ArcGisMapServerImageryProvider":
      return new Cesium.ArcGisMapServerImageryProvider(config.options);

    case "UrlTemplateImageryProvider":
      return new Cesium.UrlTemplateImageryProvider(config.options);

    case "terrain":
      return Cesium.createWorldTerrainAsync(config.options);

    default:
      console.warn(`Unknown provider type: ${config.type}`);
      return new Cesium.OpenStreetMapImageryProvider({
        url: "https://a.tile.openstreetmap.org/",
      });
  }
};
