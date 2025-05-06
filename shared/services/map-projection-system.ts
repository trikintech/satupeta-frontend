import { PaginatedResponse } from "../types/api-response";
import { MapProjectionSystem } from "../types/map-projection-system";

import { api } from "./api";

export const mapProjectionSystemApi = {
  getMapProjectionSystems: async (): Promise<
    PaginatedResponse<MapProjectionSystem[]>
  > => {
    const response = await api.get("/map_projection_systems");
    return response.data;
  },

  getMapProjectionSystemById: async (
    id: number
  ): Promise<MapProjectionSystem> => {
    const response = await api.get(`/map_projection_systems/${id}`);
    return response.data;
  },

  deleteMapProjectionSystem: async (
    id?: number
  ): Promise<PaginatedResponse<null>> => {
    const response = await api.delete(`/map_projection_systems/${id}`);
    return response.data;
  },

  createMapProjectionSystem: async (
    mapProjectionSystem: Omit<MapProjectionSystem, "id">
  ): Promise<MapProjectionSystem> => {
    const response = await api.post(
      "/map_projection_systems",
      mapProjectionSystem
    );
    return response.data;
  },
};

export default mapProjectionSystemApi;
