import { UserFormValues } from "../schemas/user";
import { PaginatedResponse } from "../types/api-response";
import { User } from "../types/user";

import { apiHelpers } from "./api";

const userApi = {
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

    return apiHelpers.get("/users", {
      params: filteredParams,
      paramsSerializer: {
        indexes: null, // This allows multiple params with the same name
      },
    });
  },

  getUserById: async (id: string): Promise<User> => {
    return apiHelpers.get(`/users/${id}`);
  },

  deleteUser: async (id?: string): Promise<User> => {
    return apiHelpers.delete(`/users/${id}`);
  },

  createUser: async (user: Omit<UserFormValues, "id">): Promise<User> => {
    console.log(user);
    return apiHelpers.post("/users", user);
  },

  updateUser: async (
    id: string,
    user: Partial<UserFormValues>
  ): Promise<User> => {
    return apiHelpers.patch(`/users/${id}`, user);
  },
};

export default userApi;
