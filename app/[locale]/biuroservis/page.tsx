import { unstable_setRequestLocale } from "next-intl/server";
import Services from "./services/Services";

export default function Biuroservis({ searchParams, params: { locale } }: any) {
  unstable_setRequestLocale(locale);

  return <Services params={locale} searchParams={searchParams} />;
}
