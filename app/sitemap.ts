import { MetadataRoute } from "next";
import { locales } from "../locales";
import { pathnames as translations } from "@/pathnames";

const defaultLocale = "en" as const;

const pathnames = [
  "/",
  "/about-us",
  "/contact",
  "/impressum",
  "/biuroservis",
  "/biuroservis/recrutation",
  "/biuroservis/housing",
  "/biuroservis/cleaning-services",
  "/career",
  "/collaboration",
  "/gallery",
  "/job-offers",
  "/job-offers/offer/12",
  "/job-offers/offer/14",
  "/job-offers/offer/15",
  "/job-offers/offer/16",
];
const host = "https://visbro.de";

export default function sitemap(): MetadataRoute.Sitemap {
  function getUrl(pathname: string, locale: string) {
    if (pathname === "/" || locale === defaultLocale) {
      return `${host}/${locale}${pathname === "/" ? "" : pathname}`;
    }

    // @ts-ignore
    const translatedPathname = translations[pathname]?.[locale] || pathname;
    return `${host}/${locale}${translatedPathname}`;
  }

  return pathnames.map((pathname, index) => ({
    url: getUrl(pathname, defaultLocale),
    lastModified: new Date(),
    priority: 1 - index * 0.025,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(pathname, locale)])
      ),
    },
  }));
}
