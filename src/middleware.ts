import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  admin: [/^\/admin/, /^\/listings\/.*$/, /^\/dashboard\/admin/],
  landlord: [
    /^\/landlord/,
    /^\/create-listing/,
    /^\/listings\/.*$/,
    /^\/dashboard\/landlord/,
  ],
  tenant: [/^\/tenant/, /^\/listings\/.*$/, /^\/dashboard\/tenant/],
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

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo.role as Role]) {
    const allowedRoutes = roleBasedPrivateRoutes[userInfo.role as Role];

    if (allowedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", req.url));
};

export const config = {
  matcher: [
    "/listings/:listingId",
    "/dashboard/admin/:path*",
    "/dashboard/landlord/:path*",
    "/dashboard/tenant/:path*",
  ],
};
