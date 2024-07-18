import clsx from "clsx";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Recruitment" });

  return {
    title: t("heading") + " - Visbro Personal Solutions",
    description: t("content"),
  };
}

export default function Recrutation({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Recruitment");
  return (
    <article className="mt-5 border-t border-t-zinc-700 flex flex-col lg:flex-row gap-5">
      <div className="flex-1 flex flex-col">
        <h1 className="text-5xl font-bold py-5">{t("heading")}</h1>
        <p className="text-zinc-300 mb-5 flex-1 text-lg rtl:text-xl">
          {t.rich("content")}
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
          "/home_tiles/Tiles.webp",
          "/home_tiles/Amazon.webp",
          "/slider/Forklift.jpg",
          "/slider/Warehouse.webp",
        ].map((src, index) => (
          <Image
            priority
            key={src}
            alt="decoration"
            width={500}
            height={500}
            src={src}
            className={clsx(
              "object-cover w-full h-full 2xl:max-h-[19rem] 2xl:flex",
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
