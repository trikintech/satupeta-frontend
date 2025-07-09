import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

import { AxiosError } from "axios";

import { toast } from "sonner";

// Query client setup
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      handleGlobalError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      handleGlobalError(error);
    },
  }),
});

let hasRedirected = false;

function handleGlobalError(error: unknown) {
  if (
    typeof window !== "undefined" &&
    error &&
    typeof error === "object" &&
    "isAxiosError" in error
  ) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      const requestUrl = axiosError.config?.url;
      const isAuthEndpoint =
        requestUrl?.includes("/auth/refresh") ||
        requestUrl?.includes("/me") ||
        requestUrl?.includes("/auth/session");

      if (isAuthEndpoint) return;

      if (!hasRedirected) {
        hasRedirected = true;
        toast.error("Session expired. Refreshing token...");
        window.location.href = "/auth/admin/logout";
      }
    } else {
      toast.error(axiosError.message || "Something went wrong.");
    }
  }
}
