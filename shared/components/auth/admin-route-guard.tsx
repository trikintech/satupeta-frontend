"use client";

import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthSession } from "@/shared/hooks/use-session";

export default function AdminRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthSession();

  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // Only run this logic on /admin routes
    const isAdminRoute = pathname.startsWith("/admin");

    if (isAdminRoute) {
      if (!isAuthenticated && !isLoading) {
        // redirect if unauthenticated
        router.push(
          `/auth/admin/login?callbackUrl=${encodeURIComponent(pathname)}`
        );
        return;
      }

      // once auth is loaded and user is authenticated (or route doesn't need redirect)
      if (isAuthenticated || !isLoading) {
        setCanRender(true);
      }
    } else {
      // non-admin routes always render
      setCanRender(true);
    }
  }, [pathname, isAuthenticated, isLoading, router]);

  if (!canRender) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
