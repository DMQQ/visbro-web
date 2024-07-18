import clsx from "clsx";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Housing" });

  return {
    title: t("heading") + " - Visbro Personal Solutions",
    description: t("content"),
  };
}

export default function Housing({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Housing");

  return (
    <article className="mt-5 border-t gap-5 border-t-zinc-700 flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col">
        <h1 className="text-5xl font-bold py-5">{t("heading")}</h1>
        <p className="text-zinc-300 mb-5 text-lg flex-1 rtl:text-xl">
          {t("content")}
        </p>
        <div className="w-full flex">
          <a
            data-tel="+49 1520 8941615"
            href="tel:+49 1520 8941615"
            className=" bg-blue-900 hover:bg-blue-950 transition-colors rounded-md px-4 py-4 text-center w-full tooltip"
          >
            {t("button")}
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 md:grid-rows-2 2xl:grid-cols-2 gap-5 mt-5 flex-1">
        {[
          "/gallery/6.jpg",
          "/gallery/7.jpg",
          "/gallery/8.jpg",
          "/gallery/9.jpg",
        ].map((src, index) => (
          <Image
            quality={90}
            priority
            key={src}
            alt="Bh"
            width={500}
            height={500}
            src={src}
            className={clsx(
              "object-cover w-full h-full max-h-[22rem] 2xl:max-h-[18rem] 2xl:flex",
              {
                hidden: index % 2 === 1,
              }
            )}
          />
        ))}
      </div>
    </article>
  );
}
