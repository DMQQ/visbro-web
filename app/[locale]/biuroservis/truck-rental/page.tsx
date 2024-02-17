import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";

import { Link } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Rental" });

  return {
    title: t("header_title"),
  };
}

export default function CarRental({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Rental");

  const carOptions = t("car_options").split(";");

  return (
    <PageWrapper style="!mt-5 border-t border-t-zinc-700">
      <div className="mb-5 mt-5">
        <h1 className="text-white text-3xl font-bold ">{t("header_title")}</h1>
        <p className="text-zinc-300">{t("header_helper")}</p>
      </div>

      <article className="flex flex-row w-full gap-2 mb-5 flex-wrap">
        {carOptions.map((text) => (
          <button
            key={text}
            className="dark:bg-zinc-950 p-3 text-sm rounded-lg"
          >
            {text}
          </button>
        ))}
      </article>

      <article className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {Array.from(new Array(6).keys()).map((key) => (
          <section
            key={key}
            className="dark:bg-zinc-950 w-full p-4 rounded-xl flex flex-col"
          >
            <Image
              priority
              width={300}
              height={200}
              src="/car-rental-concept-illustration_114360-9267.avif"
              alt="offer image"
              className="w-full rounded-md"
            />
            <h3 className="mt-2 text-lg">Car to rent</h3>
            <p className="text-zinc-500 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab eius
              assumenda,
            </p>
            <span className="text-zinc-500 mt-1">$20/h </span>
            <Link href={"/job-offers"} className="mt-2">
              Learn more
            </Link>
          </section>
        ))}
      </article>
    </PageWrapper>
  );
}