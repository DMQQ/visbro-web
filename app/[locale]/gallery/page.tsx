import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Gallery" });

  return {
    title: t("heading"),
  };
}

export default function Gallery({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Gallery");
  return (
    <PageWrapper>
      <article className="p-5 rounded-md w-full md:w-4/5 lg:w-2/3 m-auto">
        <div className="mb-10">
          <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold ">
            {t("heading")}
          </h1>
          <p className="text-zinc-300 mt-2">{t("heading_helper")}</p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Array.from(new Array(12).keys()).map((key) => (
            <img
              key={key}
              src="/car-rental-concept-illustration_114360-9267.avif"
              alt=""
              className="w-full"
            />
          ))}
        </section>
      </article>
    </PageWrapper>
  );
}
