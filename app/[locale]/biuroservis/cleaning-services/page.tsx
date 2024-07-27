import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Cleaning" });

  return {
    title: t("heading") + " - Visbro Personal Solutions",
    description: t("content"),
  };
}

export default function CleaningServices({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Cleaning");

  return (
    <article className="mt-5 border-t border-t-zinc-700 flex flex-col lg:flex-row gap-5">
      <div className="flex-1 flex flex-col">
        <h1 className="text-5xl font-bold py-5">{t("heading")}</h1>
        <p className="text-zinc-200 mb-5 text-lg flex-1 rtl:text-xl">
          {t("content")}
        </p>

        <div className=" w-full flex">
          <a
            rel="noopener noreferrer"
            target="_blank"
            data-tel="+49 1520 8941615"
            href="tel:+49 1520 8941615"
            className=" bg-blue-900 hover:bg-blue-950 transition-colors rounded-md px-4 py-4 text-center w-full tooltip"
          >
            {t("button")}
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-1 2xl:grid-cols-2 flex-1 mt-5">
        {["/4.png", "/home/cleaning.jpg"].map((src) => (
          <Image
            priority
            key={src}
            alt="Bh"
            width={300}
            height={200}
            src={src}
            className="object-cover w-full h-full lg:max-h-52 2xl:max-h-full"
          />
        ))}
      </div>
    </article>
  );
}
