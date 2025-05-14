import { PaginatedResponse } from "../types/api-response";
import { Classification } from "../types/classification";

import { apiHelpers } from "./api";

const classificationApi = {
  getClassifications: async (): Promise<
    PaginatedResponse<Classification[]>
  > => {
    return apiHelpers.get("/classifications");
  },

  getClassificationById: async (id: number): Promise<Classification> => {
    return apiHelpers.get(`/classifications/${id}`);
  },

  deleteClassification: async (
    id?: number
  ): Promise<PaginatedResponse<null>> => {
    return apiHelpers.delete(`/classifications/${id}`);
  },

  createClassification: async (
    classification: Omit<Classification, "id">
  ): Promise<Classification> => {
    return apiHelpers.post("/classifications", classification);
  },
};

export default classificationApi;
