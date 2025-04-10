import { User } from "@/shared/types/user";

import { ApiResponse } from "../types/api-response";

import api from "./api";

const getUsers = async ({
  page,
  per_page,
  search,
}: {
  page?: number;
  per_page?: number;
  search?: string;
}): Promise<ApiResponse<User[]>> => {
  try {
    const response = await api.get("/user", {
      params: {
        page,
        per_page,
        search,
      },
    });

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const userApi = {
  getUsers,
};
