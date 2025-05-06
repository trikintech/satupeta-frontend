import { PaginatedResponse } from "../types/api-response";
import { MapSource } from "../types/map-source";

import { api } from "./api";

export const mapSourceApi = {
  getMapSources: async (): Promise<PaginatedResponse<MapSource[]>> => {
    const response = await api.get("/map_sources");
    return response.data;
  },

  getMapSourceById: async (id: number): Promise<MapSource> => {
    const response = await api.get(`/map_sources/${id}`);
    return response.data;
  },

  deleteMapSource: async (id?: number): Promise<PaginatedResponse<null>> => {
    const response = await api.delete(`/map_sources/${id}`);
    return response.data;
  },

  createMapSource: async (
    mapSource: Omit<MapSource, "id">
  ): Promise<MapSource> => {
    const response = await api.post("/map_sources", mapSource);
    return response.data;
  },
};

export default mapSourceApi;
