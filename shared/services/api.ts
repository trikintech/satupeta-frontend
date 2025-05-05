import axios, { AxiosError, AxiosInstance } from "axios";

import { getSession, signOut } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Membuat instance axios untuk refresh token yang tidak menggunakan interceptor
const axiosRefresh = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Membuat instance axios utama
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tracking jika sedang melakukan refresh token
let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: {
  resolve: (token: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (error: any) => void;
}[] = [];

// Fungsi untuk memproses antrian request yang gagal
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};

// Fungsi untuk mendapatkan session
async function getAccessToken() {
  const session = await getSession();
  return session?.access_token || null;
}

// Fungsi untuk refresh token
async function refreshToken() {
  try {
    const session = await getSession();

    if (!session?.refresh_token) {
      throw new Error("No refresh token available");
    }

    const response = await axiosRefresh.post("/auth/refresh", {
      refresh_token: session.refresh_token,
    });

    // Update session
    // Catatan: Di sini kita perlu menggunakan update session dari next-auth
    // Namun karena keterbatasan API, kita asumsikan fungsi refresh akan
    // secara otomatis meng-update session melalui callback jwt di NextAuth

    return response.data.data.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    // Logout jika refresh token gagal
    await signOut({ callbackUrl: "/admin/login?error=session_expired" });
    throw error;
  }
}

// Interceptor untuk request
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor untuk response
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalRequest: any = error.config;

    // Handle 401 error (token expired) dan coba refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh" // Cegah loop refresh
    ) {
      if (isRefreshing) {
        // Jika sudah melakukan refresh, tambahkan request ke antrian
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();

        // Proses semua request yang gagal dalam antrian
        processQueue(null, newToken);

        // Update header Authorization dengan token baru
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        isRefreshing = false;

        // Retry request asli dengan token baru
        return api(originalRequest);
      } catch (refreshError) {
        // Proses antrian dengan error jika refresh gagal
        processQueue(refreshError);
        isRefreshing = false;

        // Redirect ke halaman login
        window.location.href = "/admin/login?error=session_expired";

        return Promise.reject(refreshError);
      }
    }

    // Jika bukan 401 atau refresh gagal, return error asli
    return Promise.reject(error);
  }
);

// Helper functions untuk operasi CRUD umum
const apiHelpers = {
  get: <T>(url: string, params = {}) =>
    api.get<T>(url, { params }).then((res) => res.data),

  post: <T>(url: string, data = {}) =>
    api.post<T>(url, data).then((res) => res.data),

  put: <T>(url: string, data = {}) =>
    api.put<T>(url, data).then((res) => res.data),

  delete: <T>(url: string) => api.delete<T>(url).then((res) => res.data),
};

export { api, apiHelpers };
