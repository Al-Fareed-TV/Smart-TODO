import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/user/login" || path === "/user/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/user/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/user/login", "/user/signup"],
};
