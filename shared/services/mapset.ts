import { PaginatedResponse } from "../types/api-response";
import { Mapset, MapsetSubmitPayload } from "../types/mapset";

import { api } from "./api";

export const mapsetApi = {
  getMapsets: async (params?: {
    filter?: string | string[];
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<Mapset[]>> => {
    const response = await api.get("/mapsets", {
      params,
      paramsSerializer: {
        indexes: null, // This allows multiple params with the same name
      },
    });
    return response.data;
  },

  getMapsetById: async (id: string): Promise<Mapset> => {
    const response = await api.get(`/mapsets/${id}`);
    return response.data;
  },

  deleteMapset: async (id?: string): Promise<PaginatedResponse<null>> => {
    const response = await api.delete(`/mapsets/${id}`);
    return response.data;
  },

  createMapset: async (
    mapset: Omit<MapsetSubmitPayload, "id">
  ): Promise<Mapset> => {
    const response = await api.post("/mapsets", mapset);
    return response.data;
  },

  updateMapsetStatus: async (
    id: string,
    status: string,
    layer_url: string
  ): Promise<Mapset> => {
    const response = await api.patch(`/mapsets/${id}`, {
      status_validation: status,
      layer_url,
    });
    return response.data;
  },
};

export default mapsetApi;
