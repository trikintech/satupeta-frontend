// hooks/use-auth-api.ts

import { useSession, signOut } from "next-auth/react";

import { useEffect } from "react";

import { setupApiInterceptors } from "../services/api";

export function useAuthApi() {
  const { data: session, status } = useSession();

  useEffect(() => {
    setupApiInterceptors(
      // Get token function
      () => (session?.access_token as string) || null,

      // Refresh token function
      async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                refresh_token: session?.refresh_token,
              }),
            }
          );

          const data = await response.json();
          return data.data.access_token;
        } catch (error) {
          console.error("Error refreshing token:", error);
          throw error;
        }
      },

      // Session expired handler
      () => signOut({ callbackUrl: "/auth/admin/login?error=session_expired" })
    );
  }, [session]);

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
