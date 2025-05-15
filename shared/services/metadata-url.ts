import axios from "axios";

import mapSourceApi from "./map-source";

export interface LayerOption {
  name: string;
  url: string;
}

const fetchGeoNetworkLayersFromSourceId = async (
  sourceId: string
): Promise<LayerOption[]> => {
  try {
    const source = await mapSourceApi.getMapSourceById(sourceId);
    const baseUrl = source.url;

    const searchUrl = `${baseUrl}/srv/api/search/records/_search`;
    const payload = {
      query: {
        term: {
          valid: "1",
        },
      },
      size: 10000,
    };

    const res = await axios.post(searchUrl, payload);
    const hits = res.data.hits?.hits ?? [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const layers: LayerOption[] = hits.map((hit: any) => {
      const uuid = hit._source.uuid;
      const resourceTitleObj = hit._source.resourceTitleObject ?? {};
      const name =
        resourceTitleObj["default"] ??
        resourceTitleObj["langind"] ??
        `Untitled - ${uuid.slice(0, 6)}`;
      const url = `${baseUrl}/srv/api/records/${uuid}/formatters/xml`;

      return { name, url };
    });

    return layers;
  } catch (error) {
    console.error("Failed to fetch GeoNetwork records", error);
    return [];
  }
};

export { fetchGeoNetworkLayersFromSourceId };
