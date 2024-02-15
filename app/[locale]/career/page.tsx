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
    <main className="w-full min-h-screen flex items-center flex-col lg:flex-row justify-around gap-5">
      <section className="dark:bg-zinc-950 p-5 rounded-md md:w-10/12 lg:w-4/5 xl:w-1/2 2xl:w-1/3">
        <h1 className="text-4xl lg:text-6xl font-bold pb-5 text-white ">
          {t("heading")}
        </h1>
        <p className="text-zinc-200 text-md sm:text-lg ">{t("content")}</p>

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
