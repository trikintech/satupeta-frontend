import { PaginatedResponse } from "../types/api-response";
import { Category } from "../types/category";

import { api } from "./api";

export const categoryApi = {
  getCategories: async (): Promise<PaginatedResponse<Category[]>> => {
    const response = await api.get("/categories");
    return response.data;
  },

  getCategoryById: async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  deleteCategory: async (id?: number): Promise<PaginatedResponse<null>> => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (category: Omit<Category, "id">): Promise<Category> => {
    const response = await api.post("/categories", category);
    return response.data;
  },
};

export default categoryApi;
