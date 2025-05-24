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
    const filteredParams = { ...params };
    if (!filteredParams.sort) {
      delete filteredParams.sort;
    }

    return apiHelpers.get("/mapsets", {
      params: filteredParams,
      paramsSerializer: {
        indexes: null,
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
    notes: string,
    layer_url: string
  ): Promise<Mapset> => {
    return apiHelpers.patch(`/mapsets/${id}`, {
      status_validation: status,
      notes: notes,
      layer_url,
    });
  },

  bulkDeactivate: async (mapsetIds: string[]): Promise<Mapset[]> => {
    return apiHelpers.patch("/mapsets/activation", {
      ids: mapsetIds,
      is_active: false,
    });
  },
};

export default mapsetApi;
