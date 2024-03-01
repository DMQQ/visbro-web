import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";

import { unstable_setRequestLocale } from "next-intl/server";

import { getTranslations } from "next-intl/server";
import { cars } from "./cars";
import CarTile from "./CarTile";
import Navigation from "../Navigation";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Rental" });

  return {
    title: t("header_title"),
    description: t("content"),
  };
}

export default function CarRental({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Rental");

  return (
    <>
      <div className="mb-5 mt-5 p-2 border-t border-t-zinc-700">
        <h1 className="text-white text-3xl md:text-5xl font-bold ">
          {t("header_title")}
        </h1>
        <p className="text-zinc-400">{t("header_helper")}</p>
      </div>

      <p className="text-zinc-200 mb-5 text-lg">{t("content")}</p>

      <article className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
        {cars.map((car) => (
          <CarTile key={car.name} car={car} />
        ))}
      </article>
    </>
  );
}
