import { CategoryFormValues } from "../schemas/category";
import { PaginatedResponse } from "../types/api-response";
import { Category } from "../types/category";

import { apiHelpers } from "./api";

const categoryApi = {
  getCategories: async (params?: {
    search?: string;
    filter?: string | string[];
    limit?: number;
    offset?: number;
    sort?: string;
  }): Promise<PaginatedResponse<Category[]>> => {
    const filteredParams = { ...params };
    if (!filteredParams.sort) {
      delete filteredParams.sort;
    }

    return apiHelpers.get("/categories", {
      params: filteredParams,
      paramsSerializer: {
        indexes: null, // This allows multiple params with the same name
      },
    });
  },

  getCategoryById: async (id: string): Promise<Category> => {
    return apiHelpers.get(`/categories/${id}`);
  },

  deleteCategory: async (id?: string): Promise<Category> => {
    return apiHelpers.delete(`/categories/${id}`);
  },

  createCategory: async (
    category: Omit<CategoryFormValues, "id">
  ): Promise<Category> => {
    return apiHelpers.post("/categories", category);
  },

  updateCategory: async (
    id: string,
    category: Partial<Category>
  ): Promise<Category> => {
    return apiHelpers.patch(`/categories/${id}`, category);
  },
};

export default categoryApi;
