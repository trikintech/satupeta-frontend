import { CredentialFormValues } from "../schemas/credential";
import { PaginatedResponse } from "../types/api-response";
import { Credential } from "../types/credential";

import { apiHelpers } from "./api";

export const credentialApi = {
  getCredentials: async (params?: {
    filter?: string | string[];
    limit?: number;
    offset?: number;
    sort?: string;
  }): Promise<PaginatedResponse<Credential[]>> => {
    const filteredParams = { ...params };
    if (!filteredParams.sort) {
      delete filteredParams.sort;
    }

    return apiHelpers.get("/credentials", {
      params: filteredParams,
      paramsSerializer: {
        indexes: null, // This allows multiple params with the same name
      },
    });
  },

  getCredentialById: async (id: string): Promise<Credential> => {
    return apiHelpers.get(`/credentials/${id}`);
  },

  getCredentialDecrypted: async (id: string): Promise<Credential> => {
    return apiHelpers.get(`/credentials/${id}/decrypted`);
  },

  deleteCredential: async (id?: string): Promise<Credential> => {
    return apiHelpers.delete(`/credentials/${id}`);
  },

  createCredential: async (
    credential: Omit<CredentialFormValues, "id">
  ): Promise<Credential> => {
    console.log(credential);
    return apiHelpers.post("/credentials", credential);
  },

  updateCredential: async (
    id: string,
    credential: Partial<Credential>
  ): Promise<Credential> => {
    return apiHelpers.patch(`/credentials/${id}`, credential);
  },
};

export default credentialApi;
