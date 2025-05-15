import { NewsFormValues } from "../schemas/news";
import { PaginatedResponse } from "../types/api-response";
import { News } from "../types/news";

import { apiHelpers } from "./api";

const newsApi = {
  getNewsList: async (params?: {
    search?: string;
    filter?: string | string[];
    limit?: number;
    offset?: number;
    sort?: string;
  }): Promise<PaginatedResponse<News[]>> => {
    const filteredParams = { ...params };
    if (!filteredParams.sort) {
      delete filteredParams.sort;
    }

    return apiHelpers.get("/news", {
      params: filteredParams,
      paramsSerializer: {
        indexes: null,
      },
    });
  },

  getNewsById: async (id: string): Promise<News> => {
    return apiHelpers.get(`/news/${id}`);
  },

  deleteNews: async (id?: string): Promise<News> => {
    return apiHelpers.delete(`/news/${id}`);
  },

  createNews: async (news: Omit<NewsFormValues, "id">): Promise<News> => {
    return apiHelpers.post("/news", news);
  },

  updateNews: async (id: string, news: Partial<News>): Promise<News> => {
    return apiHelpers.patch(`/news/${id}`, news);
  },
};

export default newsApi;
