import { PaginatedResponse } from "../types/api-response";
import { UserSubmitPayload, User } from "../types/user";

import { apiHelpers } from "./api";

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

    return apiHelpers.get("/users", {
      ...filteredParams,
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

  createUser: async (user: Omit<UserSubmitPayload, "id">): Promise<User> => {
    console.log(user);
    return apiHelpers.post("/users", user);
  },

  updateUser: async (id: string, user: UserSubmitPayload): Promise<User> => {
    return apiHelpers.put(`/users/${id}`, user);
  },
};

export default userApi;
