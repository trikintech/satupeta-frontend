import { PaginatedResponse } from "../types/api-response";
import { History } from "../types/history";

import { apiHelpers } from "./api";

const historyApi = {
  getHistories: async (params?: {
    search?: string;
    filter?: string | string[];
    limit?: number;
    offset?: number;
    sort?: string;
  }): Promise<PaginatedResponse<History[]>> => {
    const filteredParams = { ...params };
    if (!filteredParams.sort) {
      delete filteredParams.sort;
    }

    return apiHelpers.get("/histories", {
      params: filteredParams,
      paramsSerializer: {
        indexes: null,
      },
    });
  },

  getHistoryById: async (id: string): Promise<History> => {
    return apiHelpers.get(`/histories/${id}`);
  },

  deleteHistory: async (id?: string): Promise<History> => {
    return apiHelpers.delete(`/histories/${id}`);
  },
};

export default historyApi;
