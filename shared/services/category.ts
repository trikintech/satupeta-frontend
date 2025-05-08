import { CategoryFormValues } from "../schemas/category";
import { PaginatedResponse } from "../types/api-response";
import { Category } from "../types/category";

import { apiHelpers } from "./api";

export const categoryApi = {
  getCategories: async (params?: {
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
      ...filteredParams,
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
    console.log(category);
    return apiHelpers.post("/categories", category);
  },

  updateCategory: async (
    id: string,
    category: CategoryFormValues
  ): Promise<Category> => {
    return apiHelpers.patch(`/categories/${id}`, category);
  },
};

export default categoryApi;
