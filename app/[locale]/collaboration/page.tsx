import { useTranslations } from "next-intl";
import Form from "./CollaborationForm";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Collaboration" });

  return {
    title: t("title"),
    description: t.rich("content", {
      br: () => "",
    }),
  };
}

export default function Collaboration({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Collaboration");
  return (
    <main className="w-full min-h-screen flex items-center flex-col lg:flex-row justify-around gap-5">
      <section className="dark:bg-zinc-950 p-5 rounded-md md:w-10/12 lg:w-4/5 xl:w-1/2 2xl:w-1/3">
        <h1 className="text-4xl lg:text-6xl font-bold pb-5  text-white ">
          {t("title")}
        </h1>
        <p className="text-zinc-300 text-md sm:text-lg rtl:text-xl">
          {t.rich("content", {
            br: () => <br className="my-2" />,
          })}
        </p>
      </section>

      <Form />
    </main>
  );
}
