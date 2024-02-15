import AboutSlider from "@/components/AboutSlider/AboutSlider";
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("heading"),
    description: t("content"),
  };
}

export default function AboutUs({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("About");
  // return (
  //   <main className="w-full min-h-screen flex flex-col xl:flex-row items-center md:w-11/12 mx-auto gap-10 max-w-screen-2xl">
  //     <section className="dark:bg-zinc-950 p-5 w-full h-full md:w-10/12 xl:w-1/2 flex-[1]">
  //       <h1 className="text-4xl lg:text-6xl font-bold pb-5 text-white ">
  //         {t("heading")}
  //       </h1>

  //       <p className="text-zinc-300 text-md sm:text-lg">{t("content")}</p>
  //     </section>

  //     <section className="flex-1 h-full w-full p-5 mt-10">
  //       <AboutSlider />
  //     </section>
  //   </main>
  // );

  return (
    <PageWrapper>
      <article className="p-5 rounded-md w-full md:w-4/5 lg:w-2/3 m-auto">
        <div className="mb-10 ">
          <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold ">
            {t("heading")}
          </h1>
          <p className="text-zinc-300 mt-2">Visbro Personal Solution</p>
        </div>

        <section className="flex flex-col bg-zinc-950">
          <p className="text-zinc-300 text-md sm:text-lg">{t("content")}</p>

          <AboutSlider />
        </section>
      </article>
    </PageWrapper>
  );
}
