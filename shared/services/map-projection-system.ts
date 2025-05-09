import { PaginatedResponse } from "../types/api-response";
import { MapProjectionSystem } from "../types/map-projection-system";

import { apiHelpers } from "./api";

export const mapProjectionSystemApi = {
  getMapProjectionSystems: async (): Promise<
    PaginatedResponse<MapProjectionSystem[]>
  > => {
    return apiHelpers.get("/map_projection_systems");
  },

  getMapProjectionSystemById: async (
    id: number
  ): Promise<MapProjectionSystem> => {
    return apiHelpers.get(`/map_projection_systems/${id}`);
  },

  deleteMapProjectionSystem: async (
    id?: number
  ): Promise<PaginatedResponse<null>> => {
    return apiHelpers.delete(`/map_projection_systems/${id}`);
  },

  createMapProjectionSystem: async (
    mapProjectionSystem: Omit<MapProjectionSystem, "id">
  ): Promise<MapProjectionSystem> => {
    return apiHelpers.post("/map_projection_systems", mapProjectionSystem);
  },
};

export default mapProjectionSystemApi;
