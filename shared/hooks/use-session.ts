import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

export function useAuthSession(requireAuth = false) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

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
  };
}
