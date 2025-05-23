"use client";

import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { hasAdminAccess } from "@/shared/config/access-admin";
import { useAuthSession } from "@/shared/hooks/use-session";

export default function AdminRouteGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  const { session, status } = useAuthSession(true);

  const hasTokenError = session?.error === "RefreshAccessTokenError";

  useEffect(() => {
    if (hasTokenError && isAdminRoute) {
      router.push(
        `/auth/admin/login?callbackUrl=${encodeURIComponent(pathname)}`
      );
    }
  }, [hasTokenError, isAdminRoute, pathname, router]);

  const isAdmin = hasAdminAccess(session?.user?.role?.name);

  useEffect(() => {
    if (status === "authenticated" && !isAdmin && isAdminRoute) {
      router.push("/auth/admin/login");
    }
  }, [status, isAdmin, isAdminRoute, router]);

  if (
    isAdminRoute &&
    (status === "loading" || (status === "unauthenticated" && !isAdmin))
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
