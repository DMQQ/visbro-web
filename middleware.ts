import createMiddleware from "next-intl/middleware";
import { locales } from "./locales";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const intl = createMiddleware({
    locales: locales,
    defaultLocale: "pl",
    localePrefix: "always",
  });

  const regexp = /^http:\/\/localhost:3000\/pl\/api\/.+$/;
  const isApiUrl = regexp.test(request.url);

  if (isApiUrl) {
  }

  return intl(request);
}

export const config = {
  matcher: [
    "/",
    "/(de|en|ro|ru|pl|tr|ua|es)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
