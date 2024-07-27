import Slider from "@/components/Slider/Slider";
import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Ad from "@/components/Home/Ad";
import JobOffersPreview from "@/components/Home/JobOffersPreview";
import PartnersList from "@/components/Home/PartnersList";
import WhyUs from "@/components/Home/WhyUs";
import { locales } from "@/locales";

import { keywords, titles } from "../../seo";
import { Metadata } from "next";

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

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title:
      titles["index"][locale as keyof typeof titles.index] ||
      t("headings.title"),
    description: t("text.short_about").slice(0, 150),
    keywords: (
      keywords["index"]?.[locale as keyof typeof keywords.index] || []
    ).join(", "),
    alternate: [
      locales.map((locale) => ({
        hrefLang: locale,
        href: `/${locale}`,
      })),
      {
        hrefLang: "x-default",
        href: "/",
      },
    ],
    openGraph: {
      title:
        titles["index"][locale as keyof typeof titles.index] ||
        t("headings.title"),
      description: t("text.short_about").slice(0, 150),
      url: `https://visbro.de/`,
      type: "website",
      locale: locale,
      images: images.map(({ image, srcset }) => ({
        url: `https://visbro.de/slider/${image}`,
        srcset: srcset,
        alt: "Slider",
      })),
      countryName: (locale as string).toUpperCase(),
      phoneNumbers: [
        "+49 1520 8941615",
        "+49 1577 2264941",
        "+49 1577 2264940",
      ],
      emails: [
        "Biuro.rekrutacja@visbro.de",
        "kamil.czarnecki@visbro.de",
        "Elena.lungu@visbro.de ",
      ],
      siteName: "Visbro Personal Solution",
      alternateLocale: locales,
    },

    twitter: {
      title: "Visbro Personal Solution",
      description: t("text.short_about").slice(0, 150),
    },
  } as Metadata;
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
