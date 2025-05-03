import { PaginatedResponse } from "../types/api-response";
import { Organization } from "../types/organization";

import api from "./api";

export const organizationApi = {
  getOrganizations: async (): Promise<PaginatedResponse<Organization[]>> => {
    const response = await api.get("/organizations");
    return response.data;
  },

  getOrganizationById: async (id: number): Promise<Organization> => {
    const response = await api.get(`/organizations/${id}`);
    return response.data;
  },

  deleteOrganization: async (id?: number): Promise<PaginatedResponse<null>> => {
    const response = await api.delete(`/organizations/${id}`);
    return response.data;
  },

  createOrganization: async (
    organization: Omit<Organization, "id">
  ): Promise<Organization> => {
    const response = await api.post("/organizations", organization);
    return response.data;
  },
};

export default organizationApi;
