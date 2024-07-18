import { MetadataRoute } from "next";
import { locales } from "../locales";

const defaultLocale = "en" as const;

const pathnames = [
  "/",
  "/about-us",
  "/contact",
  "/impressum",
  "/biuroservis",
  "/career",
  "/collaboration",
  "/gallery",
  "/job-offers",
  "/job-offers/offer/1",
  "/job-offers/offer/2",
  "/job-offers/offer/3",
  "/job-offers/offer/4",
];
const host = "https://visbro.de";

export default function sitemap(): MetadataRoute.Sitemap {
  function getUrl(pathname: string, locale: string) {
    return `${host}/${locale}${pathname === "/" ? "" : pathname}`;
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
