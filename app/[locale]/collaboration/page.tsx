import { useTranslations } from "next-intl";
import Form from "./CollaborationForm";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Collaboration" });

  return {
    title: t("title"),
  };
}

export default function Collaboration({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Collaboration");
  return (
    <main className="w-full min-h-screen flex items-center flex-col lg:flex-row justify-around p-2 lg:p-5 gap-5">
      <section className="dark:dark:bg-zinc-950 p-3 rounded-md py-5 md:w-10/12 lg:w-4/5 xl:w-1/2 2xl:w-1/3 mb-10">
        <h1 className="text-4xl lg:text-6xl font-bold  text-white ">
          {t("title")}
        </h1>
        <p className="text-zinc-200 mt-10 text-md">
          {t.rich("content", {
            br: () => <br className="my-2" />,
          })}
        </p>
      </section>
      <Form />
    </main>
  );
}
