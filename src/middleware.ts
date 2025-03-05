import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  admin: [/^\/admin/, /^\/listings\/.*$/],
  landlord: [/^\/landlord/, /^\/create-listing/, /^\/listings\/.*$/],
  tenant: [/^\/tenant/, /^\/listings\/.*$/],
};

export const middleware = async (req: NextRequest) => {
  const userInfo = await getCurrentUser();
  const { pathname } = req.nextUrl;

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, req.url)
      );
    }
  }

  if (pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", req.url));
};

export const config = {
  matcher: [
    "/create-listing",
    "/admin",
    "/admin/:path*",
    "/tenant",
    "/tenant/:path*",
    "/landlord",
    "/landlord/:path*",
    "/listings/:listingId",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
