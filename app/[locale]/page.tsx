import Slider from "@/components/Slider/Slider";
import { unstable_setRequestLocale } from "next-intl/server";

import { getTranslations } from "next-intl/server";
import Ad from "@/components/Home/Ad";
import JobOffersPreview from "@/components/Home/JobOffersPreview";
import PartnersList from "@/components/Home/PartnersList";
import WhyUs from "@/components/Home/WhyUs";

const BREAKPOINTS = ["1200w", "800w", "400w"];
const images = [
  [
    "AmazonDriver.webp",
    "AmazonDriver-screen-md.webp",
    "AmazonDriver-screen-sm.webp",
  ],
  ["Delivery.webp", "Delivery-screen-md.webp", "Delivery-screen-sm.webp"],
  ["amazon.webp", "amazon.webp", "amazon.webp"],
  ["FarmField.webp", "FarmField-screen-md.webp", "FarmField-screen-sm.webp"],
  ["Gastro2.webp", "Gastro2-screen-md.webp", "Gastro2-screen-sm.webp"],
  ["Warehouse.webp", "Warehouse-screen-md.webp", "Warehouse-screen-sm.webp"],
].map((srcs) => {
  let srcset = "";

  for (let i = srcs.length - 1; i >= 0; i--) {
    srcset += "/slider/" + srcs[i] + " " + BREAKPOINTS[i] + ", \n";
  }

  return {
    image: srcs[0],
    srcset: srcset,
  };
});

const keywords = {
  de: [
    "Personalvermittlung",
    "Rekrutierung",
    "Stellenvermittlung",
    "Jobvermittlung",
    "Personalsuche",
    "Kandidatensuche",
    "Bewerbermanagement",
    "Einstellung",
    "Personalbeschaffung",
    "Personalberatung",
    "Headhunting",
    "Fachkräftesuche",
    "Jobangebote",
    "Arbeitsvermittlung",
    "Karriereberatung",
    "Bewerbungsprozess",
    "Personaldienstleistungen",
    "Personalagentur",
  ],
  pl: [
    "pośrednictwo pracy",
    "rekrutacja",
    "agencja zatrudnienia",
    "rekrutowanie",
    "poszukiwanie pracowników",
    "zarządzanie kandydatami",
    "zatrudnienie",
    "pozyskiwanie pracowników",
    "doradztwo personalne",
    "headhunting",
    "poszukiwanie specjalistów",
    "oferty pracy",
    "pośrednictwo zawodowe",
    "doradztwo kariery",
    "proces rekrutacyjny",
    "usługi personalne",
    "agencja personalna",
  ],
  ro: [
    "recrutare",
    "agenție de recrutare",
    "plasare de forță de muncă",
    "căutare de candidați",
    "gestionare candidați",
    "angajare",
    "achiziție de personal",
    "consultanță în personal",
    "headhunting",
    "căutare de specialiști",
    "oferte de muncă",
    "servicii de plasare a forței de muncă",
    "consiliere în carieră",
    "proces de recrutare",
    "servicii de resurse umane",
    "agenție de personal",
  ],
  tr: [
    "işe alım",
    "işe alım ajansı",
    "işe yerleştirme",
    "aday arama",
    "aday yönetimi",
    "istihdam",
    "personel temini",
    "insan kaynakları danışmanlığı",
    "headhunting",
    "uzman arama",
    "iş ilanları",
    "işe yerleştirme hizmetleri",
    "kariyer danışmanlığı",
    "işe alım süreci",
    "insan kaynakları hizmetleri",
    "personel ajansı",
  ],
  ua: [
    "рекрутинг",
    "агенція з підбору персоналу",
    "працевлаштування",
    "пошук кандидатів",
    "управління кандидатами",
    "найм",
    "залучення персоналу",
    "кадрове консультування",
    "хедхантинг",
    "пошук спеціалістів",
    "вакансії",
    "послуги з працевлаштування",
    "консультування з кар'єри",
    "процес підбору персоналу",
    "кадрові послуги",
    "агенція з підбору кадрів",
  ],
} as const;

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: "Visbro Personal Solutions ",
    description: t("text.short_about"),
    keywords: (keywords?.[locale as keyof typeof keywords] || []).join(", "),
    alternate: [
      {
        hrefLang: "de",
        href: "/de",
      },
      {
        hrefLang: "pl",
        href: "/pl",
      },
      {
        hrefLang: "ro",
        href: "/ro",
      },
      {
        hrefLang: "tr",
        href: "/tr",
      },
      {
        hrefLang: "ua",
        href: "/ua",
      },
    ],
  };
}

export default async function Home({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Home" });

  return (
    <main className="w-full">
      <Slider images={images} locale={locale} />

      <WhyUs />

      <Ad />

      <JobOffersPreview locale={locale} />
      <PartnersList />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Visbro Personal Solution",
            url: "https://visbro.com",
            sameAs: [
              "https://www.facebook.com/profile.php?id=61556830941642",
              "https://www.tiktok.com/@visbro.personal.s?_t=8k2Ttg57UZM&_r=1",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+4915208941615",
              contactType: "Customer service",
              areaServed: "DE",
              availableLanguage: [
                "German",
                "Polish",
                "English",
                "Russian",
                "Ukrainian",
                "Romanian",
              ],
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: " Franz-Flemming-Straße 43a/2OG",
              postalCode: "04179",
              addressCountry: "DE",
            },
            provider: {
              "@type": "Organization",
              name: "Visbro Personal Solution",
            },
            description: t("text.short_about"),
          }),
        }}
      ></script>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Visbro Personal Solution",
            url: "https://visbro.com",
            provider: {
              "@type": "Organization",
              name: "Visbro Personal Solution",
            },
            areaServed: "DE",
            description: t("text.short_about"),
          }),
        }}
      ></script>
    </main>
  );
}
