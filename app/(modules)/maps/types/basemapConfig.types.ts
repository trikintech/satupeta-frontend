interface LeafletConfig {
  url: string;
  attribution: string;
  maxZoom: number;
}

export interface CesiumConfig {
  type: string;
  options: any;
  baseImagery?: CesiumBaseImageryConfig;
}

interface CesiumBaseImageryConfig {
  type: string;
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
