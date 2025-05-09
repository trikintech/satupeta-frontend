import { PaginatedResponse } from "../types/api-response";
import { Role } from "../types/role";

import { apiHelpers } from "./api";

export const roleApi = {
  getRoles: async (params?: {
    filter?: string;
    search?: string;
    limit?: number;
  }): Promise<PaginatedResponse<Role[]>> => {
    return apiHelpers.get("/roles", { params });
  },

  getRoleById: async (id: number): Promise<Role> => {
    return apiHelpers.get(`/roles/${id}`);
  },

  deleteRole: async (id?: number): Promise<PaginatedResponse<null>> => {
    return apiHelpers.delete(`/roles/${id}`);
  },

  createRole: async (role: Omit<Role, "id">): Promise<Role> => {
    return apiHelpers.post("/roles", role);
  },
};

export default roleApi;
