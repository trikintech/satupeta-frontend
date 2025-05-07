import { PaginatedResponse } from "../types/api-response";
import { Role } from "../types/role";

import { api } from "./api";

export const roleApi = {
  getRoles: async (params?: {
    filter?: string;
    search?: string;
    limit?: number;
  }): Promise<PaginatedResponse<Role[]>> => {
    const response = await api.get("/roles", {
      params,
    });
    return response.data;
  },

  getRoleById: async (id: number): Promise<Role> => {
    const response = await api.get(`/roles/${id}`);
    return response.data;
  },

  deleteRole: async (id?: number): Promise<PaginatedResponse<null>> => {
    const response = await api.delete(`/roles/${id}`);
    return response.data;
  },

  createRole: async (role: Omit<Role, "id">): Promise<Role> => {
    const response = await api.post("/roles", role);
    return response.data;
  },
};

export default roleApi;
