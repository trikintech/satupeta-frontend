"use client";

import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AdminRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  // Gunakan useSession dari next-auth untuk mendapatkan status autentikasi
  const { data: session, status } = useSession({
    required: isAdminRoute,
    onUnauthenticated() {
      if (isAdminRoute) {
        router.push(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`);
      }
    },
  });

  // Pengecekan error pada token
  const hasTokenError = session?.error === "RefreshAccessTokenError";

  // Jika token error, redirect ke login
  useEffect(() => {
    if (hasTokenError && isAdminRoute) {
      router.push(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [hasTokenError, isAdminRoute, pathname, router]);

  // Cek apakah user memiliki role admin
  const isAdmin = session?.user?.role === "admin";

  // Redirect jika bukan admin tetapi mencoba mengakses rute admin
  useEffect(() => {
    if (status === "authenticated" && !isAdmin && isAdminRoute) {
      router.push("/unauthorized");
    }
  }, [status, isAdmin, isAdminRoute, router]);

  // Tampilkan loading state saat proses autentikasi
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
