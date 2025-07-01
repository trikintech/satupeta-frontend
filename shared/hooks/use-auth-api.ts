"use client";
import { useSession, signOut } from "next-auth/react";

import { useEffect } from "react";

import { setupApiInterceptors } from "../services/api";
import authApi from "../services/auth";

export const handleLogout = async () => {
  try {
    await authApi.logout();
    await signOut();
  } catch (e) {
    console.error(e);
    await signOut();
  }
};

export function useAuthApi() {
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    const getToken = () => {
      if (!session?.access_token) return null;
      return session.access_token;
    };

    setupApiInterceptors(getToken);
  }, [session, status]);

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    update,
  };
}
