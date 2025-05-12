import { auth } from "@/auth";

import { NextResponse } from "next/server";

import { hasPermission, Permission } from "./shared/config/role";

const protectedRoutes: Record<
  string,
  { menu: string; permission: Permission }
> = {
  "/admin/users": { menu: "user", permission: "read" },
  "/admin/category": { menu: "category", permission: "read" },
  "/admin/organization": { menu: "organization", permission: "read" },
  "/admin/mapset": { menu: "mapset", permission: "read" },
  "/admin/news": { menu: "news", permission: "read" },
};

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/maps", "/login", "/not-found"];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Skip for public routes, static files, and auth routes
  if (
    isPublicRoute ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/auth")
  ) {
    return NextResponse.next();
  }

  // Handle auth safely
  const session = req.auth;

  // Redirect to login if not authenticated
  if (!session?.user) {
    const loginUrl = new URL("/", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = session.user?.role;

  // If no role is assigned, consider as not-found
  if (!userRole) {
    return NextResponse.redirect(new URL("/not-found", req.nextUrl));
  }

  // Find the most specific route that matches
  let matchedRoute:
    | [string, { menu: string; permission: Permission }]
    | undefined;
  for (const [path, config] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(path)) {
      // Find the most specific (longest) matching path
      if (!matchedRoute || path.length > matchedRoute[0].length) {
        matchedRoute = [path, config];
      }
    }
  }

  if (matchedRoute) {
    const { menu, permission } = matchedRoute[1];
    const isAllowed = hasPermission(userRole, menu, permission);

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/not-found", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
