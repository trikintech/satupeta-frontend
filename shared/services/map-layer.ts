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
        // Get bounding box from layer XML
        const bboxElement = layer.getElementsByTagName("BoundingBox")[0];
        let bbox = "-20037508.34,-20037508.34,20037508.34,20037508.34"; // default fallback

        if (bboxElement) {
          const minx = bboxElement.getAttribute("minx");
          const miny = bboxElement.getAttribute("miny");
          const maxx = bboxElement.getAttribute("maxx");
          const maxy = bboxElement.getAttribute("maxy");

          if (minx && miny && maxx && maxy) {
            bbox = `${minx},${miny},${maxx},${maxy}`;
          }
        }

        layerMap.set(name, {
          name,
          url: `${serverUrl}/wms?service=WMS&version=1.1.0&request=GetMap&layers=${name}&bbox=${bbox}&width=768&height=534&srs=EPSG:4326&styles=&format=application/openlayers`,
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
