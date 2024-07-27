import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader/AppHeader";
import AppFooter from "@/components/AppFooter/AppFooter";
import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { locales } from "@/locales";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { keywords, titles } from "@/seo";

const inter = Inter({ subsets: ["latin"] });

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
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  const messages = useMessages();

  const t = (key: string) => messages["Home"]?.[key];

  return (
    <html
      lang={params.locale}
      className="dark "
      dir={params.locale === "ar" ? "rtl" : "ltr"}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Visbro Personal Solution UG",
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
                name: "Visbro Personal Solution UG",
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
              name: "Visbro Personal Solution UG",
              url: "https://visbro.com",
              provider: {
                "@type": "Organization",
                name: "Visbro Personal Solution UG",
              },
              areaServed: "DE",
              description: t("text.short_about"),
            }),
          }}
        ></script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Visbro Personal Solution UG",
              image: "https://www.visbro.de/logo.png",
              url: "https://www.visbro.de",
              telephone: "+4915208941615",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Franz-Flemming-Straße 43a/2OG",
                addressLocality: "Leipzig",
                postalCode: "04179",
                addressCountry: "DE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "51.35052423724389",
                longitude: "12.305066944834751",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:00",
                  closes: "17:30",
                },
              ],
              sameAs: [
                "https://www.facebook.com/profile.php?id=61556830941642",
                "https://www.tiktok.com/@visbro.personal.s?_t=8k2Ttg57UZM&_r=1",
              ],
            }),
          }}
        ></script>
      </head>
      <NextIntlClientProvider locale={params.locale} messages={messages}>
        <body
          className={`${inter.className} bg-white text-black dark:dark:bg-zinc-950 dark:text-white`}
          style={{
            backgroundImage: "url(/bg.svg)", // high performance boost if placed here istead of globals.css
            backgroundSize: "contain",
          }}
        >
          <AppHeader />
          <main className="mt-16">{children}</main>

          <AppFooter />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}

export default RootLayout;
