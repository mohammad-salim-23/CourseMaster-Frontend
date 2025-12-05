
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const role = req.cookies.get("role")?.value;

  const { pathname } = req.nextUrl;

  const publicRoutes = ["/login", "/register", "/"];
  if (publicRoutes.includes(pathname)) return NextResponse.next();

  // User routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    return NextResponse.next();
  }

  // Admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (role !== "admin")
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
