"use client";

import { useSession } from "next-auth/react";

export function useAuthSession() {
  const { data: session, status } = useSession();
  return {
    user: session?.user,
    username: session?.user?.username,
    accessToken: session?.accessToken,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}
