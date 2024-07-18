import AboutSlider from "@/components/AboutSlider/AboutSlider";
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("heading") + " - Visbro Personal Solutions",
    description: t("content"),
  };
}

export default function AboutUs({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("About");

  return (
    <PageWrapper>
      <article className="p-5 rounded-md w-full md:w-4/5 lg:w-2/3 m-auto">
        <div className="mb-10 ">
          <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold ">
            {t("heading")}
          </h1>
          <p className="text-zinc-300 mt-2">Visbro Personal Solutions</p>
        </div>

        <section className="flex flex-col bg-zinc-950">
          <p className="text-zinc-300 text-md sm:text-lg rtl:text-lg">
            {t("content")}
          </p>

          <AboutSlider />
        </section>
      </article>
    </PageWrapper>
  );
}
