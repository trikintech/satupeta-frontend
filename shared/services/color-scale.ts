import { apiHelpers } from "./api";

export interface VillageBoundaryFeature {
  METADATA: string;
  SRS_ID: string;
  WADMKK: string;
  WADMPR: string;
  WADMPR_ID: string;
  WADMKK_ID: string;
  OBJECTID: number;
  "hc-group": string;
  "hc-key": string;
  "hc-a2": string;
  country: string;
  value: number;
  color: string;
}

export interface ChoroplethRangeColor {
  from: number;
  to: number;
  color: string;
  total_cluster: number;
}

export interface ColorScaleResult {
  data: VillageBoundaryFeature[];
  rangelist: ChoroplethRangeColor;
}

interface GetColorScaleProps {
  source_url: string;
  color_range?: string[];
  boundary_file_id: string;
}

const colorScaleApi = {
  getColorScale: async ({
    source_url,
    color_range,
    boundary_file_id,
  }: GetColorScaleProps): Promise<ColorScaleResult> => {
    return apiHelpers.post("/mapsets/color_scale", {
      source_url,
      color_range,
      boundary_file_id,
    });
  },
};

export default colorScaleApi;
