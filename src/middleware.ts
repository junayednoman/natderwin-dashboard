import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ['/login', '/otp-verification', '/set-new-password', '/forgot-password'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // return NextResponse.next();
  const pathName = request.nextUrl.pathname;

  const accessToken = request?.cookies?.get("adminAccessToken")?.value;

  let user = null;
  if (accessToken) user = jwtDecode(accessToken!);

  if (!accessToken || !user) {
    if (authRoutes.includes(pathName)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathName}`, request.url)
      );
    }
  } else if (accessToken && user && authRoutes.includes(pathName)) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  } else {
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/login", '/verifyEmail', '/setNewPass', '/forgetPassword'],
};
