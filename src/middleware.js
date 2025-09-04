import { NextResponse } from "next/server";

export function middleware(req) {
  const loggedIn = req.cookies.get("loggedIn");

  // if not logged in and trying to access dashboard, redirect
  if (!loggedIn && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url)); // redirect to login page
  }

  return NextResponse.next();
}

// Apply middleware only to dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};
