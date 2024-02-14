import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo } from "react";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("heading"),
  };
}

export default function Contact({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const t = useTranslations("Contact");

  return (
    <PageWrapper style="flex justify-center items-center">
      <article className="w-full p-5 sm:w-2/3 m-auto -translate-y-16">
        <h1 className="text-4xl lg:text-6xl font-bold  text-white mt-16">
          {t("heading")}
        </h1>
        <p className="text-zinc-300 mt-2">{t("heading_helper")}</p>

        <article className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-20">
          {[0, 1, 2, 4, 5, 6].map((key) => (
            <section
              key={key}
              className={`bg-zinc-900 p-5 rounded-md ${
                key % 2 == 1 ? "xl:-translate-y-10" : ""
              }`}
            >
              <Image
                width={140}
                height={50}
                src={"/person_placeholder.jpg"}
                alt="Zdjęcie rekrutera"
                className={`rounded-full m-auto mt-5 ${
                  key === 1 ? "w-36" : "w-28"
                }`}
              />

              <h2
                className={`font-bold text-3xl text-center mt-2 ${
                  key === 1 ? "text-blue-400" : "text-white"
                }`}
              >
                Jan Kowalski
              </h2>
              <p className="text-blue-400 text-center">
                {key === 1 ? "Właściciel" : "Rekruter"}
              </p>
              <div className="flex flex-col gap-2 mt-5 text-center">
                <a href="">Phone: +49 213 742 069</a>
                <a href="">Email: Email@address.com</a>
                <a href="">Email 2: email@gmail</a>
              </div>
            </section>
          ))}
        </article>

        <h2 className="text-3xl lg:text-4xl font-bold  text-white mt-10">
          {t("location_heading")}
        </h2>
        <p className="mb-5 text-zinc-300">
          Franz-Flemming-Straße, 04179 Leipzig, Niemcy
        </p>

        <Map zoom={15} position={[51.349860469934505, 12.3051689]}></Map>

        <h2 className="text-3xl lg:text-4xl font-bold  text-white my-5 mt-10">
          {t("phone_heading")}
        </h2>
        <p className="text-xl text-zinc-300">{t("open_hours")} 9:00-17:00</p>
        <a href="tel:+49 000 0000 000">+49 99 99 999 9</a>
      </article>
    </PageWrapper>
  );
}
