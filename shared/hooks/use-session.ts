"use client";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { hasPermission, Permission } from "../config/role";

export function useAuthSession(requireAuth = false) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const checkPermission = (module: string, action: Permission) => {
    const userRole = session?.user?.role;
    if (!userRole) return false;
    return hasPermission(userRole, module, action);
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated && requireAuth) {
      router.push("/auth/signin");
    }
  }, [isLoading, isAuthenticated, requireAuth, router]);

  return {
    session,
    isLoading,
    isAuthenticated,
    status,
    checkPermission,
  };
}
