import { auth } from "@/auth";

import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Add '/' to publicRoutes
  const publicRoutes = ["/", "/maps"]; // <-- Added root path here
  const adminRoutes = ["/admin"];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (
    isPublicRoute ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  if (isAdminRoute && !req.auth) {
    return NextResponse.redirect(
      new URL(
        `/auth/admin/login?callbackUrl=${encodeURIComponent(pathname)}`,
        req.nextUrl
      )
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
