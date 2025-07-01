"use client";
import { useSession, signOut } from "next-auth/react";

import { useEffect, useRef } from "react";

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
  const isInitialized = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || isInitialized.current) return;

    const getToken = () => {
      if (!session?.access_token) return null;
      return session.access_token;
    };

    setupApiInterceptors(getToken);
    isInitialized.current = true;
  }, [session, status]);

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    update,
  };
}
