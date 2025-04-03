interface LeafletConfig {
  url: string;
  attribution: string;
  maxZoom: number;
}

export interface CesiumConfig {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  baseImagery?: CesiumBaseImageryConfig;
}

interface CesiumBaseImageryConfig {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
}

export interface BasemapConfig {
  [key: string]: {
    name: string;
    thumbnail: string;
    leaflet: LeafletConfig;
    cesium: CesiumConfig;
  };
}
