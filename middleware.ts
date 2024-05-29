import createMiddleware from "next-intl/middleware";
import { locales } from "./locales";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const intl = createMiddleware({
    locales: locales,
    defaultLocale: "pl",
    localePrefix: "always",
  });

  return intl(request);
}

export const config = {
  matcher: [
    "/",
    "/(de|en|ro|ru|pl|tr|ua|es|ar)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
