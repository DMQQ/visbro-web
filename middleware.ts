import createMiddleware from "next-intl/middleware";
import { locales } from "./locales";

export default createMiddleware({
  locales: locales,
  defaultLocale: "pl",
  localePrefix: "always",
});

export const config = {
  matcher: [
    "/",
    "/(de|en|ro|ru|pl|tr|ar|ua|es)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
