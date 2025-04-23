"use client";

import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthSession } from "@/shared/hooks/use-session";

export default function AdminRouteGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isLoading } = useAuthSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    setIsAdminRoute(pathname.startsWith("/admin/dashboard"));
  }, [pathname]);

  useEffect(() => {
    if (isAdminRoute && !isAuthenticated) {
      router.push(
        `/auth/admin/login?callbackUrl=${encodeURIComponent(pathname)}`
      );
    }
  }, [isAdminRoute, router, pathname, isAuthenticated]);

  if (isAdminRoute && isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
