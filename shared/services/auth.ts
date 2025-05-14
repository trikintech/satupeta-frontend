import { User } from "../types/user";

import { apiHelpers } from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

const authApi = {
  login: async (credentials: LoginPayload): Promise<LoginResponse> => {
    return apiHelpers.post("/auth/login", credentials);
  },

  logout: async (): Promise<void> => {
    return apiHelpers.post("/auth/logout");
  },

  me: async (): Promise<User> => {
    return apiHelpers.get("/me");
  },
};

export default authApi;
