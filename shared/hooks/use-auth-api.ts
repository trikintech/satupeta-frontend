"use client";
import { useSession, signOut } from "next-auth/react";

import { useEffect } from "react";

import { setupApiInterceptors } from "../services/api";
import authApi from "../services/auth";

export const handleLogout = async () => {
  await authApi.logout();
  await signOut();
};

export function useAuthApi() {
  const { data: session, status } = useSession();

  useEffect(() => {
    setupApiInterceptors(() => (session?.access_token as string) || null);
  }, [session]);

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
