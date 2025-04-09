import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const userEmail = request.cookies.get("userEmail")?.value;
  const isAdminRoute = request.nextUrl.pathname.includes("/admin");

  const isLoginRoute = request.nextUrl.pathname.includes("/login");


  if (isLoginRoute) {
    if (userEmail) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (isAdminRoute) {
    if (userEmail !== process.env.EMAIL_USERNAME) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
