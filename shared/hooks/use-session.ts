import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";

export function useAuthSession(requireAuth = true) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  if (!isLoading && !isAuthenticated && requireAuth) {
    redirect("/auth/signin");
  }

  return {
    session,
    isLoading,
    isAuthenticated,
    status,
  };
}
