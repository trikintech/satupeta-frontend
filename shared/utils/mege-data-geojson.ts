import { VillageBoundaryFeature } from "../services/color-scale";

/**
 * Merges an array of data items (with hc-key, value, color) into
 * a GeoJSON FeatureCollection by matching on feature.properties["hc-key"].
 *
 * @param geojsonInput  The source GeoJSON FeatureCollection
 * @param dataList      Array of { "hc-key", value, color }
 * @returns             A new GeoJSON FeatureCollection with added
 *                      value and color properties
 */
export function mergeDataToGeoJSON(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geojsonInput: any,
  dataList: VillageBoundaryFeature[]
) {
  // Build lookup map from hc-key to { value, color }
  const lookupByKey: Record<string, { value: number; color: string }> = {};

  for (const item of dataList) {
    lookupByKey[item["hc-key"]] = {
      value: item.value,
      color: item.color,
    };
  }

  // Deep-clone so we don’t mutate the original
  const mergedGeoJSON = JSON.parse(JSON.stringify(geojsonInput));

  mergedGeoJSON.features = mergedGeoJSON.features.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (feature: any) => {
      const key = (feature.properties as never)["hc-key"] as string;
      const match = lookupByKey[key] ?? {
        value: null,
        color: "#cccccc",
      };

      // Merge new props onto existing properties
      feature.properties = {
        ...feature.properties,
        value: match.value,
        color: match.color,
      };

      return feature;
    }
  );

  return mergedGeoJSON;
}
