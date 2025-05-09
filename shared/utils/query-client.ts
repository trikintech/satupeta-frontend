import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

import { signOut } from "next-auth/react";

import { AxiosError } from "axios";

import { toast } from "sonner";

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

function handleGlobalError(error: unknown) {
  if (
    typeof window !== "undefined" &&
    error &&
    typeof error === "object" &&
    "isAxiosError" in error
  ) {
    const axiosError = error as AxiosError;

    if (
      axiosError.response?.status === 401 ||
      axiosError.response?.status === 429
    ) {
      toast.error("Session expired. Redirecting to login...");
      signOut();
    }
  }
}
