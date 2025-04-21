import { ApiResponse } from "../types/api-response";
import { Organization } from "../types/organization";

import api from "./api";

export const organizationApi = {
  getOrganizations: async (): Promise<ApiResponse<Organization[]>> => {
    const response = await api.get("/organisasi");
    return response.data;
  },

  getOrganizationById: async (
    id: number
  ): Promise<ApiResponse<Organization>> => {
    const response = await api.get(`/organisasi/${id}`);
    return response.data;
  },

  deleteOrganization: async (id?: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/organisasi/${id}`);
    return response.data;
  },

  createOrganization: async (
    organization: Omit<Organization, "id">
  ): Promise<ApiResponse<Organization>> => {
    const response = await api.post("/organisasi", organization);
    return response.data;
  },
};

export default organizationApi;
