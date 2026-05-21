import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  
  const sessionCookie = request.cookies.get("better-auth.session_token") || 
                        request.cookies.get("__Secure-better-auth.session_token");

  
  if (!sessionCookie) {
    
    const protectedPaths = ["/dashboard", "/my-profile"];
    
    
    const isDetailsPage = pathname.startsWith("/all-doctors/");

    if (protectedPaths.includes(pathname) || isDetailsPage) {
      
      const loginUrl = new URL("/login", request.url);
      
      
      loginUrl.searchParams.set("callbackUrl", pathname); 
      
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/my-profile/:path*", 
    "/all-doctors/:path*" 
  ],
};