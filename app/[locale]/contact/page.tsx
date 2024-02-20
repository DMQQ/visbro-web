import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo } from "react";

import { getTranslations } from "next-intl/server";

const recurters = [
  {
    image: "/person_placeholder.jpg",
    name: "Jan Kowalski",
    position: "Rekruter",
    contacts: ["+49 000 000 000", "Email@email.com", "Email.2@email.com"],
    languages: ["pl", "en", "de"],
  },
  {
    image: "/person_placeholder.jpg",
    name: "Mariusz Kowalski",
    position: "Rekruter",
    contacts: ["+49 000 000 000", "Email@email.com", "Email.2@email.com"],
    languages: ["de", "ua", "ru"],
  },
  {
    image: "/person_placeholder.jpg",
    name: "Jan Kowalski",
    position: "Rekruter",
    contacts: ["+49 000 000 000", "Email@email.com", "Email.2@email.com"],
    languages: ["pl", "en", "de"],
  },
  {
    image: "/person_placeholder.jpg",
    name: "Jan Kowalski",
    position: "Rekruter",
    contacts: ["+49 000 000 000", "Email@email.com", "Email.2@email.com"],
    languages: ["pl", "en", "de"],
  },
  {
    image: "/person_placeholder.jpg",
    name: "Jan Kowalski",
    position: "Rekruter",
    contacts: ["+49 000 000 000", "Email@email.com", "Email.2@email.com"],
    languages: ["de", "en", "es"],
  },
  {
    image: "/person_placeholder.jpg",
    name: "Jan Kowalski",
    position: "Rekruter",
    contacts: ["+49 000 000 000", "Email@email.com", "Email.2@email.com"],
    languages: ["ru", "ro", "tr"],
  },
];

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

        <article className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 mt-16">
          {recurters.map((details, key) => (
            <section key={key} className={`bg-zinc-900 p-5 rounded-md `}>
              <Image
                width={140}
                height={50}
                priority
                src={details.image}
                alt="Zdjęcie rekrutera"
                className={`rounded-full m-auto`}
              />

              <h2 className={`font-bold text-3xl text-center mt-2`}>
                {details.name}
              </h2>
              <p className="text-blue-400 text-center">{details.position}</p>
              <div className="flex flex-col gap-2 mt-5 text-center">
                {details.contacts.map((value) => (
                  <a href="#" key={value}>
                    {value}
                  </a>
                ))}
              </div>
              <div className="flex gap-2 mt-2 justify-center">
                {details.languages.map((locale) => (
                  <Image
                    key={locale}
                    width={40}
                    height={30}
                    src={"/flags/" + locale + ".png"}
                    alt={locale + " Flag"}
                    className="w-8 rounded-sm"
                  />
                ))}
              </div>
            </section>
          ))}
        </article>

        <h2 className="text-3xl lg:text-4xl font-bold  text-white mt-16">
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
