import { PaginatedResponse } from "../types/api-response";
import { Credential } from "../types/credential";

import { api } from "./api";

export const credentialApi = {
  getCredentials: async (): Promise<PaginatedResponse<Credential[]>> => {
    const response = await api.get("/credentials");
    return response.data;
  },

  getCredentialById: async (id: number): Promise<Credential> => {
    const response = await api.get(`/credentials/${id}`);
    return response.data;
  },

  deleteCredential: async (id?: number): Promise<PaginatedResponse<null>> => {
    const response = await api.delete(`/credentials/${id}`);
    return response.data;
  },

  createCredential: async (
    credential: Omit<Credential, "id">
  ): Promise<Credential> => {
    const response = await api.post("/credentials", credential);
    return response.data;
  },
};

export default credentialApi;
