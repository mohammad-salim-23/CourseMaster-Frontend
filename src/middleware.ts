// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value; 
  const role = request.cookies.get("role")?.value; // "admin" / "user"

  const { pathname } = request.nextUrl;

  // Public routes — always allow
  const publicRoutes = ["/login", "/register", "/"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // User Protected Routes
 
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      // User not logged in
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  
  //Admin Protected Routes

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (role !== "admin") {
      // Not authorized
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

// Routes that run middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
