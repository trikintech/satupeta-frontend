import * as Cesium from "cesium";

import { CesiumConfig } from "../types/basemapConfig.types";

export const createCesiumProvider = async (
  config: CesiumConfig
): Promise<Cesium.ImageryProvider | Cesium.TerrainProvider> => {
  switch (config.type) {
    case "OpenStreetMapImageryProvider":
      return new Cesium.OpenStreetMapImageryProvider(config.options);

    case "ArcGisMapServerImageryProvider":
      return await Cesium.ArcGisMapServerImageryProvider.fromUrl(
        config.options.url
      );

    case "UrlTemplateImageryProvider":
      return new Cesium.UrlTemplateImageryProvider(config.options);

    case "terrain":
      return new Cesium.OpenStreetMapImageryProvider(config.options);

    default:
      console.warn(`Unknown provider type: ${config.type}`);
      return new Cesium.OpenStreetMapImageryProvider({
        url: "https://a.tile.openstreetmap.org/",
      });
  }
};
