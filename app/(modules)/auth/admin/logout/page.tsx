"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await signOut({
          redirect: false,
          callbackUrl: "/",
        });
        // After successful logout, redire page
        router.push("/");
      } catch (error) {
        console.error("Logout error:", error);
        // Even if there's an error, redirect to login page
        router.push("/");
      } finally {
        setIsLoggingOut(false);
      }
    };

    if (isLoggingOut) {
      doLogout();
    }
  }, [isLoggingOut, router]);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      {isLoggingOut ? "Logging out..." : "Redirecting to login..."}
    </div>
  );
}
