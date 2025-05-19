export const parseWmsUrl = (url: string | undefined | null) => {
  if (!url) return null;

  try {
    const [rawBaseUrl] = url.split("?");
    const parsedUrl = new URL(url);
    const params = parsedUrl.searchParams;

    const bbox = params.get("bbox");
    return {
      baseUrl: rawBaseUrl,
      params: {
        service: params.get("service") ?? "WMS",
        request: "GetMap",
        version: params.get("version") ?? "1.1.1",
        layers: params.get("layers") ?? "",
        styles: params.get("styles") ?? "",
        format: params.get("format") ?? "image/png",
        bounds: bbox ? parseBBoxToBounds(bbox) : null,
        transparent: "true",
        srs: params.get("srs") ?? params.get("crs") ?? "EPSG:4326",
      },
    };
  } catch (error) {
    console.error("Invalid WMS URL:", error);
    return null;
  }
};

export const getWmsTileLayerUrl = (url: string | undefined | null) => {
  const parsed = parseWmsUrl(url);
  if (!parsed) return null;

  const { baseUrl, params } = parsed;
  const version = params.version;
  const crsParamKey = version === "1.3.0" ? "crs" : "srs";

  const wmsParams = new URLSearchParams({
    service: params.service,
    request: params.request,
    version: version,
    layers: params.layers,
    styles: params.styles,
    format: "image/png",
    transparent: params.transparent,
    [crsParamKey]: params.srs,
  });

  return `${baseUrl}?${wmsParams.toString()}`;
};

import { LatLngBoundsExpression } from "leaflet";

export function parseBBoxToBounds(
  bboxString: string
): LatLngBoundsExpression | null {
  try {
    if (!bboxString) return null;

    const [minX, minY, maxX, maxY] = bboxString.split(",").map(Number);
    if ([minX, minY, maxX, maxY].some(isNaN)) return null;

    const bounds: LatLngBoundsExpression = [
      [minY, minX],
      [maxY, maxX],
    ];

    return bounds;
  } catch (e) {
    console.error("Invalid bbox input:", e);
    return null;
  }
}

interface GetLegendUrlOptions {
  baseUrl: string;
  layerName: string;
  format?: string;
  width?: number;
  height?: number;
  version?: string;
  sld_version?: string;
}

export const getLegendUrl = ({
  baseUrl,
  layerName,
  format = "image/png",
  width,
  height,
  version = "1.1.1",
  sld_version = "1.1.0",
}: GetLegendUrlOptions): string => {
  const url = new URL(baseUrl);
  url.searchParams.set("SERVICE", "WMS");
  url.searchParams.set("VERSION", version);
  url.searchParams.set("REQUEST", "GetLegendGraphic");
  url.searchParams.set("FORMAT", format);
  url.searchParams.set("LAYER", layerName);
  url.searchParams.set("SLD_VERSION", sld_version);

  if (width) url.searchParams.set("WIDTH", width.toString());
  if (height) url.searchParams.set("HEIGHT", height.toString());

  return url.toString();
};

// Fungsi terpisah untuk mendapatkan bounds dari GetCapabilities
export const getWmsLayerBounds = async (
  baseUrl: string,
  layerName: string
): Promise<L.LatLngBoundsExpression | undefined> => {
  try {
    const capabilitiesUrl =
      `${baseUrl}?` +
      new URLSearchParams({
        service: "WMS",
        version: "1.3.0",
        request: "GetCapabilities",
      });

    const response = await fetch(capabilitiesUrl);
    if (!response.ok) return undefined;

    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");

    // Find the requested layer in capabilities
    const layerElements = xmlDoc.getElementsByTagName("Layer");

    for (const element of layerElements) {
      const nameElement = element.getElementsByTagName("Name")[0];
      if (nameElement && nameElement.textContent === layerName) {
        const bboxElement =
          element.getElementsByTagName("BoundingBox")[0] ||
          element.getElementsByTagName("EX_GeographicBoundingBox")[0];

        if (bboxElement) {
          // Extract bounds based on the bbox type
          if (bboxElement.tagName === "BoundingBox") {
            const minx = parseFloat(bboxElement.getAttribute("minx") ?? "0");
            const miny = parseFloat(bboxElement.getAttribute("miny") ?? "0");
            const maxx = parseFloat(bboxElement.getAttribute("maxx") ?? "0");
            const maxy = parseFloat(bboxElement.getAttribute("maxy") ?? "0");
            return [
              [miny, minx],
              [maxy, maxx],
            ];
          } else {
            const westBound = parseFloat(
              bboxElement.getElementsByTagName("westBoundLongitude")[0]
                ?.textContent ?? "0"
            );
            const southBound = parseFloat(
              bboxElement.getElementsByTagName("southBoundLatitude")[0]
                ?.textContent ?? "0"
            );
            const eastBound = parseFloat(
              bboxElement.getElementsByTagName("eastBoundLongitude")[0]
                ?.textContent ?? "0"
            );
            const northBound = parseFloat(
              bboxElement.getElementsByTagName("northBoundLatitude")[0]
                ?.textContent ?? "0"
            );
            return [
              [southBound, westBound],
              [northBound, eastBound],
            ];
          }
        }
      }
    }

    return undefined;
  } catch (error) {
    console.error("Error fetching layer bounds:", error);
    return undefined;
  }
};

export const getWmsToGeoJsonUrl = (wmsUrl: string | undefined | null) => {
  if (!wmsUrl) return null;

  const parsedWms = parseWmsUrl(wmsUrl);
  if (!parsedWms) return null;

  const { baseUrl, params } = parsedWms;
  const downloadUrl = new URL(baseUrl);

  // Set parameters for GeoJSON download
  downloadUrl.searchParams.set("service", "WFS");
  downloadUrl.searchParams.set("version", "1.0.0");
  downloadUrl.searchParams.set("request", "GetFeature");
  downloadUrl.searchParams.set("typeName", params.layers);
  downloadUrl.searchParams.set("outputFormat", "application/json");
  downloadUrl.searchParams.set("srsName", params.srs);

  return downloadUrl.toString();
};
