
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/log-in", req.url));
  }

  if (token && pathname === "/log-in") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

   if (!token && req.nextUrl.pathname.startsWith("/career")) {
    return NextResponse.redirect(new URL("/log-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/log-in"],
};

