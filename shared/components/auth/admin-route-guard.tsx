"use client";

import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useAuthSession } from "@/shared/hooks/use-session";
import { adminRoutePermissions } from "@/shared/config/route-permission-map";
import { hasPermission } from "@/shared/config/role";

export default function AdminRouteGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  const { session, status } = useAuthSession(true);
  const role = session?.user?.role;
  const hasTokenError = session?.error === "RefreshAccessTokenError";

  // Detect menu + permission based on pathname

  const matched = Object.entries(adminRoutePermissions).find(([route]) =>
    pathname.startsWith(route)
  );

  const menu = matched?.[1]?.menu;
  const permission = matched?.[1]?.permission;

  const isAllowed =
    role && menu && permission ? hasPermission(role, menu, permission) : false;

  useEffect(() => {
    if (hasTokenError && isAdminRoute) {
      router.push(
        `/auth/admin/login?callbackUrl=${encodeURIComponent(pathname)}`
      );
    }
  }, [hasTokenError, isAdminRoute, pathname, router]);

  useEffect(() => {
    if (status === "authenticated" && !isAllowed && isAdminRoute) {
      router.push("/not-found");
    }
  }, [status, isAllowed, isAdminRoute, router]);

  if (
    isAdminRoute &&
    (status === "loading" || (status === "unauthenticated" && !isAllowed))
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
