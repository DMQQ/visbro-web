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
    if (
      process.env.BASE_API_URL === undefined ||
      process.env.AUTH_TOKEN === undefined
    )
      throw new Error("Missing env variables");
  }

  return intl(request);
}

export const config = {
  matcher: [
    "/",
    "/(de|en|ro|ru|pl|tr|ua|es|ar)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
