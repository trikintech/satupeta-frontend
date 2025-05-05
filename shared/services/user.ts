import { ApiResponse } from "../types/api-response";
import { UserRequest, UserResponse } from "../types/user";

import { api } from "./api";

export const userApi = {
  getUsers: async (): Promise<ApiResponse<UserResponse[]>> => {
    const response = await api.get("/user");
    return response.data;
  },

  getUserById: async (id: number): Promise<ApiResponse<UserResponse>> => {
    const response = await api.get(`/user/${id}`);
    return response.data;
  },

  deleteUser: async (id?: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  },

  createUser: async (
    user: Omit<UserRequest, "id">
  ): Promise<ApiResponse<UserResponse>> => {
    const response = await api.post("/user", user);
    return response.data;
  },

  updateUser: async (
    id: number,
    user: UserRequest
  ): Promise<ApiResponse<UserResponse>> => {
    const response = await api.put(`/user/${id}`, user);
    return response.data;
  },
};

export default userApi;
