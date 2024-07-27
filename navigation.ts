import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "./locales";
import { pathnames } from "./pathnames";

export const localePrefix = "always"; // Default

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames,
  }) as any;
