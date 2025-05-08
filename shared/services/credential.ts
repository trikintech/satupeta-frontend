import { PaginatedResponse } from "../types/api-response";
import { Credential } from "../types/credential";

import { apiHelpers } from "./api";

export const credentialApi = {
  getCredentials: async (): Promise<PaginatedResponse<Credential[]>> => {
    return apiHelpers.get("/credentials");
  },

  getCredentialById: async (id: number): Promise<Credential> => {
    return apiHelpers.get(`/credentials/${id}`);
  },

  deleteCredential: async (id?: number): Promise<PaginatedResponse<null>> => {
    return apiHelpers.delete(`/credentials/${id}`);
  },

  createCredential: async (
    credential: Omit<Credential, "id">
  ): Promise<Credential> => {
    return apiHelpers.post("/credentials", credential);
  },
};

export default credentialApi;
