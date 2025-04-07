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
