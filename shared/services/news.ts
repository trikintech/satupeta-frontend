import { PaginatedResponse } from "../types/api-response";
import { News } from "../types/news";

import { apiHelpers } from "./api";

const newsApi = {
  getAllNews: async (params?: {
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
        indexes: null, // This allows multiple params with the same name
      },
    });
  },

  getNewsById: async (id: string): Promise<News> => {
    return apiHelpers.get(`/news/${id}`);
  },

  deleteNews: async (id?: string): Promise<News> => {
    return apiHelpers.delete(`/news/${id}`);
  },

  createNews: async (news: Omit<News, "id">): Promise<News> => {
    console.log(news);
    return apiHelpers.post("/news", news);
  },

  updateNews: async (id: string, news: News): Promise<News> => {
    return apiHelpers.patch(`/news/${id}`, news);
  },
};

export default newsApi;
