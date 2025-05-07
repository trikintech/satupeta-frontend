import { ApiResponse, PaginatedResponse } from "../types/api-response";
import { UserRequest, User } from "../types/user";

import { api } from "./api";

export const userApi = {
  getUsers: async (params?: {
    filter?: string | string[];
    limit?: number;
    offset?: number;
    sort?: string;
  }): Promise<PaginatedResponse<User[]>> => {
    const filteredParams = { ...params };
    if (!filteredParams.sort) {
      delete filteredParams.sort;
    }

    const response = await api.get("/users", {
      params: filteredParams,
      paramsSerializer: {
        indexes: null, // This allows multiple params with the same name
      },
    });
    return response.data;
  },

  getUserById: async (id: number): Promise<ApiResponse<User>> => {
    const response = await api.get(`/user/${id}`);
    return response.data;
  },

  deleteUser: async (id?: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  },

  createUser: async (
    user: Omit<UserRequest, "id">
  ): Promise<ApiResponse<User>> => {
    const response = await api.post("/user", user);
    return response.data;
  },

  updateUser: async (
    id: number,
    user: UserRequest
  ): Promise<ApiResponse<User>> => {
    const response = await api.put(`/user/${id}`, user);
    return response.data;
  },
};

export default userApi;
