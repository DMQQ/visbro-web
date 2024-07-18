import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Form from "./CareerForm";

import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Career" });

  return {
    title: t("heading") + " - Visbro Personal Solutions",
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
        <p className="text-zinc-300 text-md sm:text-lg rtl:text-xl">
          {t("content")}
        </p>

        {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-5">
          {[
            "/slider/Delivery.jpg",
            "/home/cleaningCut.jpg",
            "/home_tiles/Gastro.webp",
            "/home_tiles/Tiles.webp",
          ].map((image) => (
            <div key={image} className="w-full">
              <Image
                quality={100}
                priority
                alt="Field images"
                src={image}
                width={200}
                height={100}
                className="object-cover w-full h-52 sm:h-32"
              />
            </div>
          ))}
        </div> */}
      </section>
      <Form />
    </main>
  );
}
