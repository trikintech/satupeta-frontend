import { PaginatedResponse } from "../types/api-response";
import { Mapset } from "../types/mapset";

import api from "./api";

export const mapsetApi = {
  getMapsets: async (params?: {
    filter?: string;
    search?: string;
    limit?: number;
  }): Promise<PaginatedResponse<Mapset[]>> => {
    const response = await api.get("/mapsets", {
      params,
    });
    return response.data;
  },

  getMapsetById: async (id: number): Promise<Mapset> => {
    const response = await api.get(`/mapsets/${id}`);
    return response.data;
  },

  deleteMapset: async (id?: number): Promise<PaginatedResponse<null>> => {
    const response = await api.delete(`/mapsets/${id}`);
    return response.data;
  },

  createMapset: async (mapset: Omit<Mapset, "id">): Promise<Mapset> => {
    const response = await api.post("/mapsets", mapset);
    return response.data;
  },
};

export default mapsetApi;
