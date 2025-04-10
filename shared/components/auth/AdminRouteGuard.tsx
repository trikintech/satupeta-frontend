"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminRouteGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    setIsAdminRoute(pathname.startsWith("/admin/dashboard"));
  }, [pathname]);

  useEffect(() => {
    if (isAdminRoute && status === "unauthenticated") {
      router.push(
        `/auth/admin/login?callbackUrl=${encodeURIComponent(pathname)}`
      );
    }
  }, [status, isAdminRoute, router, pathname]);

  if (isAdminRoute && status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
