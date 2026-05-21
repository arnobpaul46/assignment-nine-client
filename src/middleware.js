import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("better-auth.session_token") || 
                        request.cookies.get("__Secure-better-auth.session_token");

  const protectedPaths = ["/dashboard", "/my-profile"];
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/my-profile/:path*"] };