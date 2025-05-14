import { PaginatedResponse } from "../types/api-response";
import { Mapset, MapsetSubmitPayload } from "../types/mapset";

import { apiHelpers } from "./api";

const mapsetApi = {
  getMapsets: async (params?: {
    filter?: string | string[];
    limit?: number;
    offset?: number;
    sort?: string;
  }): Promise<PaginatedResponse<Mapset[]>> => {
    // Remove the `sort` key if it is undefined or empty
    const filteredParams = { ...params };
    if (!filteredParams.sort) {
      delete filteredParams.sort;
    }

    return apiHelpers.get("/mapsets", {
      params: filteredParams,
      paramsSerializer: {
        indexes: null, // This allows multiple params with the same name
      },
    });
  },

  getMapsetById: async (id: string): Promise<Mapset> => {
    return apiHelpers.get(`/mapsets/${id}`);
  },

  deleteMapset: async (id?: string): Promise<PaginatedResponse<null>> => {
    return apiHelpers.delete(`/mapsets/${id}`);
  },

  createMapset: async (
    mapset: Omit<MapsetSubmitPayload, "id">
  ): Promise<Mapset> => {
    return apiHelpers.post("/mapsets", mapset);
  },

  updateMapset: async (
    id: string,
    mapset: Partial<MapsetSubmitPayload>
  ): Promise<Mapset> => {
    return apiHelpers.patch(`/mapsets/${id}`, mapset);
  },

  updateMapsetStatus: async (
    id: string,
    status: string,
    layer_url: string
  ): Promise<Mapset> => {
    return apiHelpers.patch(`/mapsets/${id}`, {
      status_validation: status,
      layer_url,
    });
  },
};

export default mapsetApi;
