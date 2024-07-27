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
    title: t("heading") + " - Visbro Personal Solutions",
    content: "Contact with Visbro Personal Solution +49 1520 8941615",
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

  const recruters = useMemo(
    () => [
      {
        image: "/workers/Kamil.webp",
        name: "Kamil Czarnecki",
        position: t("positions.ceo"),
        contacts: ["+49 1520 8941615", "kamil.czarnecki@visbro.de"],
        languages: ["de", "en", "pl"],
      },

      {
        image: "/workers/Kaja.webp",
        name: "Kaja Zimoch",
        position: t("positions.recruiter"),
        contacts: [
          "+49 1577 2264941",
          "Kaja.zimoch@visbro.de ",
          "Biuro.rekrutacja@visbro.de ",
        ],
        languages: ["de", "en", "pl"],
      },
      {
        image: "/workers/Elena.webp",
        name: "Elena Lungu",
        position: t("positions.recruiter"),
        contacts: [
          "+49 1577 2264940",
          "Birou.recrutare@visbro.de",
          "Elena.lungu@visbro.de ",
        ],
        languages: ["ru", "ro", "de", "en"],
      },
    ],
    [locale]
  );

  return (
    <PageWrapper style="flex justify-center items-center">
      <article className="w-full p-5 sm:w-2/3 m-auto -translate-y-16">
        <h1 className="text-4xl lg:text-6xl font-bold  text-white mt-16">
          {t("heading")}
        </h1>

        <article className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 mt-16">
          {recruters.map((details, key) => (
            <section
              key={key}
              className={`bg-zinc-900 rounded-lg flex flex-col`}
            >
              <Image
                width={144}
                height={144}
                priority
                src={details.image}
                alt="Zdjęcie rekrutera"
                className={`rounded-full m-auto w-36 h-36 mt-5 object-cover`}
              />

              <div className="px-5 pb-5 py-2 flex flex-col  flex-1">
                <div className="flex-1 items-center flex flex-col ">
                  <h2 className={`font-bold text-2xl text-center`}>
                    {details.name}
                  </h2>
                  <p
                    style={{
                      letterSpacing: 0.5,
                    }}
                    className=" text-center text-zinc-300 font-medium mt-2 bg-zinc-800 px-3 p-1 rounded-full text-sm"
                  >
                    {details.position}
                  </p>
                  <div className="flex flex-col mt-2 justify-center text-zinc-300 flex-wrap">
                    {details.contacts.map((value, index) => (
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={index === 0 ? `tel:${value}` : `mailto:${value}`}
                        key={value}
                        className="text-center mb-2"
                      >
                        {value}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="gap-2 mt-2 justify-center flex flex-row">
                  {details.languages.map((locale) => (
                    <Image
                      key={locale}
                      width={40}
                      height={30}
                      src={"/flags/" + locale + ".png"}
                      alt={locale + " Flag"}
                      className="w-8 rounded-[3.5px]"
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </article>

        <h2 className="text-3xl lg:text-4xl font-bold  text-white mt-16">
          {t("location_heading")}
        </h2>
        <p className="mb-5 text-zinc-300">
          Franz-Flemming-Straße 43a 04179 Leipzig, Deutschland
        </p>

        <Map zoom={15} position={[51.349860469934505, 12.3051689]}></Map>
      </article>
    </PageWrapper>
  );
}
