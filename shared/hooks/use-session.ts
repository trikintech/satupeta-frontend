"use client";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { hasPermission, Permission } from "../config/role";

export function useAuthSession(requireAuth = false) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const hasTokenError = session?.error === "RefreshAccessTokenError";

  const checkPermission = (module: string, action: Permission) => {
    const userRole = session?.user?.role;
    if (!userRole) return false;
    return hasPermission(userRole, module, action);
  };

  useEffect(() => {
    if (hasTokenError) {
      router.push("/auth/signin");
      return;
    }

    if (!isLoading && !isAuthenticated && requireAuth) {
      router.push("/auth/signin");
    }
  }, [isLoading, isAuthenticated, requireAuth, router, hasTokenError]);

  return {
    session,
    isLoading,
    isAuthenticated,
    status,
    checkPermission,
    update,
  };
}
