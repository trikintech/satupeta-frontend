import axios from "axios";

import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let cachedToken: string | null = null;

async function getToken() {
  if (cachedToken) return cachedToken;

  const session = await getSession();
  const token = session?.user?.jwt;

  if (token) {
    cachedToken = token;
  }

  return token;
}

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
