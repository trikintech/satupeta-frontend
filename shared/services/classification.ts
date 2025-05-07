import { PaginatedResponse } from "../types/api-response";
import { Classification } from "../types/classification";

import { api } from "./api";

export const classificationApi = {
  getClassifications: async (): Promise<
    PaginatedResponse<Classification[]>
  > => {
    const response = await api.get("/classifications");
    return response.data;
  },

  getClassificationById: async (id: number): Promise<Classification> => {
    const response = await api.get(`/classifications/${id}`);
    return response.data;
  },

  deleteClassification: async (
    id?: number
  ): Promise<PaginatedResponse<null>> => {
    const response = await api.delete(`/classifications/${id}`);
    return response.data;
  },

  createClassification: async (
    classification: Omit<Classification, "id">
  ): Promise<Classification> => {
    const response = await api.post("/classifications", classification);
    return response.data;
  },
};

export default classificationApi;
