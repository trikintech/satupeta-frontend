import { ApiResponse, PaginatedResponse } from "../types/api-response";
import { UserSubmitPayload, User } from "../types/user";

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

  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  deleteUser: async (id?: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  createUser: async (
    user: Omit<UserSubmitPayload, "id">
  ): Promise<ApiResponse<User>> => {
    console.log(user);
    const response = await api.post("/users", user);
    return response.data;
  },

  updateUser: async (
    id: string,
    user: UserSubmitPayload
  ): Promise<ApiResponse<User>> => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },
};

export default userApi;
