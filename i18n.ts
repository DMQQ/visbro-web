import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./locales";

export default getRequestConfig(async ({ locale = "pl" }) => {
  // Validate that the incoming `locale` parameter is valid
  // if (!locales.includes(locale as any)) locale = "en";

  // notFound()

  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./translations/${locale}.json`)).default,
  };
});
