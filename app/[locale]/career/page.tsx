import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Form from "./CareerForm";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Career" });

  return {
    title: t("heading"),
    description: t("content"),
  };
}

export default function Career({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Career");

  return (
    <main
      style={{
        marginBottom: "4rem",
      }}
      className="w-full min-h-screen gap-5 p-3 md:p-5 flex flex-col lg:flex-row items-center justify-start lg:items-start lg:justify-around md:mt-32"
    >
      <section className="w-full sm:w-10/12 lg:w-3/5 xl:w-1/3 mb-5 ">
        <h1 className="text-4xl lg:text-5xl font-bold text-white  mt-16">
          {t("heading")}
        </h1>
        <p className="text-zinc-200 mt-10 text-xl ">{t("content")}</p>

        <div className="grid grid-cols-2 gap-5 mt-5">
          <img
            src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
            alt=""
          />
          <img
            src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
            alt=""
          />
          <img
            src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
            alt=""
          />
          <img
            src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
            alt=""
          />
        </div>
      </section>
      <Form />
    </main>
  );
}
