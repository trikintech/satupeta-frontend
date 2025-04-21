import { ApiResponse } from "../types/api-response";
import { User } from "../types/user";

import api from "./api";

export const userApi = {
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get("/user");
    return response.data;
  },

  getUserById: async (id: number): Promise<ApiResponse<User>> => {
    const response = await api.get(`/user/${id}`);
    return response.data;
  },

  deleteUser: async (id?: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  },

  createUser: async (user: Omit<User, "id">): Promise<ApiResponse<User>> => {
    const response = await api.post("/user", user);
    return response.data;
  },
};

export default userApi;
