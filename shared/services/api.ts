// lib/api.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Main axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (
  error: Error | null = null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Create a session manager that works with the global state
export const setupApiInterceptors = (getToken: () => string | null) => {
  // Request interceptor
  api.interceptors.request.use(async (config) => {
    try {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return config; // Continue with the request even if token retrieval fails
    }
  });

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig;

      // Skip if it's an auth endpoint or if we've already tried to refresh
      if (
        !originalRequest ||
        originalRequest.url?.includes("/auth/refresh") ||
        originalRequest.url?.includes("/me") ||
        originalRequest.url?.includes("/auth/session") ||
        originalRequest.headers?.["X-Retry-After-Refresh"]
      ) {
        return Promise.reject(error);
      }

      // If we get a 401 and haven't tried to refresh yet
      if (error.response?.status === 401) {
        if (isRefreshing) {
          // If we're already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers && token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return api.request(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        isRefreshing = true;
        originalRequest.headers.set("X-Retry-After-Refresh", "true");

        try {
          // Wait a bit before retrying to allow NextAuth to refresh
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // The session will be automatically refreshed by NextAuth
          // We just need to retry the original request
          const response = await api.request(originalRequest);
          processQueue(null, getToken());
          return response;
        } catch (refreshError) {
          const error =
            refreshError instanceof Error
              ? refreshError
              : new Error(String(refreshError));
          processQueue(error, null);
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

// Helper functions
export const apiHelpers = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config).then((res) => res.data),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.post<T>(url, data, config).then((res) => res.data),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.patch<T>(url, data, config).then((res) => res.data),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config).then((res) => res.data),
};
