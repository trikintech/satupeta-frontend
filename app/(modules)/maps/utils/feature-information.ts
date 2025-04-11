interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

const extractFeatureInformation = (FeaturesInfo: [], layerType: string) => {
  if (layerType === "wms") {
    return FeaturesInfo.map((feature: GeoJsonFeature) => ({
      id: feature.properties.id,
      name: feature.properties.name,
      properties: feature.properties,
    }));
  }
};

export { extractFeatureInformation };
