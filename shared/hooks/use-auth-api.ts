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

      () => handleLogout()
    );
  }, [session]);

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
