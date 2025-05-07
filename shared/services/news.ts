import { PaginatedResponse } from "../types/api-response";
import { News } from "../types/news";

import { api } from "./api";

export const newsApi = {
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

    const response = await api.get("/news", {
      params: filteredParams,
      paramsSerializer: {
        indexes: null, // This allows multiple params with the same name
      },
    });
    return response.data;
  },

  getNewsById: async (id: string): Promise<News> => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },

  deleteNews: async (id?: string): Promise<News> => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },

  createNews: async (news: Omit<News, "id">): Promise<News> => {
    console.log(news);
    const response = await api.post("/news", news);
    return response.data;
  },

  updateNews: async (id: string, news: News): Promise<News> => {
    const response = await api.patch(`/news/${id}`, news);
    return response.data;
  },
};

export default newsApi;
