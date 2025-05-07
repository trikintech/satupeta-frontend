import { PaginatedResponse } from "../types/api-response";
import { Organization } from "../types/organization";

import { api } from "./api";

export const organizationApi = {
  getOrganizations: async (params?: {
    filter?: string | string[];
    limit?: number;
    offset?: number;
    sort?: string;
  }): Promise<PaginatedResponse<Organization[]>> => {
    const filteredParams = { ...params };
    if (!filteredParams.sort) {
      delete filteredParams.sort;
    }

    const response = await api.get("/organizations", {
      params: filteredParams,
      paramsSerializer: {
        indexes: null, // This allows multiple params with the same name
      },
    });
    return response.data;
  },

  getOrganizationById: async (id: string): Promise<Organization> => {
    const response = await api.get(`/organizations/${id}`);
    return response.data;
  },

  deleteOrganization: async (id?: string): Promise<Organization> => {
    const response = await api.delete(`/organizations/${id}`);
    return response.data;
  },

  createOrganization: async (
    organization: Omit<Organization, "id">
  ): Promise<Organization> => {
    console.log(organization);
    const response = await api.post("/organizations", organization);
    return response.data;
  },

  updateOrganization: async (
    id: string,
    organization: Organization
  ): Promise<Organization> => {
    const response = await api.patch(`/organizations/${id}`, organization);
    return response.data;
  },
};

export default organizationApi;
