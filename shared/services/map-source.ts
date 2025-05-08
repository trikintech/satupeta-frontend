import { PaginatedResponse } from "../types/api-response";
import { MapSource } from "../types/map-source";

import { apiHelpers } from "./api";

export const mapSourceApi = {
  getMapSources: async (): Promise<PaginatedResponse<MapSource[]>> => {
    return apiHelpers.get("/map_sources");
  },

  getMapSourceById: async (id: number): Promise<MapSource> => {
    return apiHelpers.get(`/map_sources/${id}`);
  },

  deleteMapSource: async (id?: number): Promise<PaginatedResponse<null>> => {
    return apiHelpers.delete(`/map_sources/${id}`);
  },

  createMapSource: async (
    mapSource: Omit<MapSource, "id">
  ): Promise<MapSource> => {
    return apiHelpers.post("/map_sources", mapSource);
  },
};

export default mapSourceApi;
