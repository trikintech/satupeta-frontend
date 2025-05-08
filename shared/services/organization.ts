import { OrganizationFormValues } from "../schemas/organization";
import { PaginatedResponse } from "../types/api-response";
import { Organization } from "../types/organization";

import { apiHelpers } from "./api";

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

    return apiHelpers.get("/organizations", {
      ...filteredParams,
      paramsSerializer: {
        indexes: null, // This allows multiple params with the same name
      },
    });
  },

  getOrganizationById: async (id: string): Promise<Organization> => {
    return apiHelpers.get(`/organizations/${id}`);
  },

  deleteOrganization: async (id?: string): Promise<Organization> => {
    return apiHelpers.delete(`/organizations/${id}`);
  },

  createOrganization: async (
    organization: Omit<OrganizationFormValues, "id">
  ): Promise<Organization> => {
    console.log(organization);
    return apiHelpers.post("/organizations", organization);
  },

  updateOrganization: async (
    id: string,
    organization: OrganizationFormValues
  ): Promise<Organization> => {
    return apiHelpers.put(`/organizations/${id}`, organization);
  },
};

export default organizationApi;
