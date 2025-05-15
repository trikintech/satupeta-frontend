import { MapSourceFormValues } from "../schemas/map-source";
import { PaginatedResponse } from "../types/api-response";
import { MapSource } from "../types/map-source";

import { apiHelpers } from "./api";

const mapSourceApi = {
  getMapSources: async (params?: {
    filter?: string | string[];
    limit?: number;
    offset?: number;
    sort?: string;
  }): Promise<PaginatedResponse<MapSource[]>> => {
    const filteredParams = { ...params };
    if (!filteredParams.sort) {
      delete filteredParams.sort;
    }

    return apiHelpers.get("/map_sources", {
      params: filteredParams,
      paramsSerializer: {
        indexes: null, // This allows multiple params with the same name
      },
    });
  },

  getMapSourceById: async (id: string): Promise<MapSource> => {
    return apiHelpers.get(`/map_sources/${id}`);
  },

  deleteMapSource: async (id?: string): Promise<MapSource> => {
    return apiHelpers.delete(`/map_sources/${id}`);
  },

  createMapSource: async (
    mapsSource: Omit<MapSourceFormValues, "id">
  ): Promise<MapSource> => {
    return apiHelpers.post("/map_sources", mapsSource);
  },

  updateMapSource: async (
    id: string,
    mapsSource: Partial<MapSourceFormValues>
  ): Promise<MapSource> => {
    return apiHelpers.patch(`/map_sources/${id}`, mapsSource);
  },
};

export default mapSourceApi;
