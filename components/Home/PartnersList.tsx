import { useTranslations } from "next-intl";
import Partners from "../Partners/Partners";

export default function PartnersList() {
  const t = useTranslations("Home");
  return (
    <article className="w-full p-5 mt-32 mb-16">
      <h4 className="text-white text-4xl lg:text-6xl font-bold text-center">
        {t("headings.trusted_us")}
      </h4>

      <Partners />
    </article>
  );
}
