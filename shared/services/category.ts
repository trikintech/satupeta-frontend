import { PaginatedResponse } from "../types/api-response";
import { Category } from "../types/category";

import { apiHelpers } from "./api";

export const categoryService = {
  getCategories: () =>
    apiHelpers.get<PaginatedResponse<Category[]>>("/categories"),

  getCategoryById: (id: number) =>
    apiHelpers.get<Category>(`/categories/${id}`),

  deleteCategory: (id?: number) =>
    apiHelpers.delete<PaginatedResponse<null>>(`/categories/${id}`),

  createCategory: (category: Omit<Category, "id">) =>
    apiHelpers.post<Category>("/categories", category),

  updateCategory: (id: number, category: Partial<Omit<Category, "id">>) =>
    apiHelpers.put<Category>(`/categories/${id}`, category),
};

export default categoryService;
