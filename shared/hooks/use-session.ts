"use client";

import { useSession } from "next-auth/react";

export function useAuthSession() {
  const { data: session, status } = useSession();
  return {
    user: session?.user,
    username: session?.user?.username,
    accessToken: session?.access_token,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}
