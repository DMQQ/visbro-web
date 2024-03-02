import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Services from "./services/Services";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("Biuroservis");

  return {
    title: t("heading"),
    description: "",
  };
}

export default function Biuroservis({ searchParams, params: { locale } }: any) {
  unstable_setRequestLocale(locale);

  return <Services params={locale} searchParams={searchParams} />;
}
