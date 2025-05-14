import axios from "axios";

import mapSourceApi from "./map-source";

export interface LayerOption {
  name: string;
  url: string;
}

const fetchWMSLayersFromSourceId = async (
  sourceId: string
): Promise<LayerOption[]> => {
  try {
    const source = await mapSourceApi.getMapSourceById(sourceId);
    const serverUrl = source.url;

    // Fetch WMS GetCapabilities
    const res = await axios.get(
      `${serverUrl}/wms?service=WMS&request=GetCapabilities`
    );

    const parser = new DOMParser();
    const xml = parser.parseFromString(res.data, "application/xml");
    const layers = Array.from(xml.getElementsByTagName("Layer"));

    const layerMap = new Map<string, LayerOption>();

    layers.forEach((layer) => {
      const name = layer.getElementsByTagName("Name")[0]?.textContent;
      if (name) {
        layerMap.set(name, {
          name,
          url: `${serverUrl}/wms?layers=${name}&service=WMS&request=GetMap`,
        });
      }
    });

    // Convert Map to array to remove duplicates
    const parsedLayers = Array.from(layerMap.values());

    return parsedLayers;
  } catch (error) {
    console.error("Failed to fetch WMS layers", error);
    return [];
  }
};

export { fetchWMSLayersFromSourceId };
