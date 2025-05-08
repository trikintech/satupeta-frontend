import { auth } from "@/auth";

import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Add '/' to publicRoutes
  const publicRoutes = ["/", "/maps"];
  const adminRoutes = ["/admin"];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Allow access to public routes, static files, and auth endpoints
  if (
    isPublicRoute ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/auth")
  ) {
    return NextResponse.next();
  }

  // Only redirect to login for admin routes when not authenticated
  if (isAdminRoute && !req.auth) {
    return NextResponse.redirect(new URL(`/}`, req.nextUrl));
  }

  // For all other routes, allow access
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
