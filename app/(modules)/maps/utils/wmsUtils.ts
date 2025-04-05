export const parseWmsUrl = (url: string | undefined | null) => {
  if (!url) return null;

  try {
    const [rawBaseUrl] = url.split("?");
    const parsedUrl = new URL(url);
    const params = parsedUrl.searchParams;

    console.log(rawBaseUrl);

    return {
      baseUrl: rawBaseUrl,
      params: {
        service: params.get("service") ?? "WMS",
        request: "GetMap",
        version: params.get("version") ?? "1.1.1",
        layers: params.get("layers") ?? "",
        styles: params.get("styles") ?? "",
        format: params.get("format") ?? "image/png",
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

  console.log(wmsParams);
  console.log(baseUrl);

  return `${baseUrl}?${wmsParams.toString()}`;
};
