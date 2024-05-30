import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader/AppHeader";
import AppFooter from "@/components/AppFooter/AppFooter";
import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { locales } from "@/locales";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: "Visbro Personal Solution UG",
    description: t("text.short_about"),
  };
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

  return (
    <html
      lang={params.locale}
      className="dark "
      dir={params.locale === "ar" ? "rtl" : "ltr"}
    >
      <NextIntlClientProvider locale={params.locale} messages={messages}>
        <body
          className={`${inter.className} bg-white text-black dark:dark:bg-zinc-950 dark:text-white`}
          style={{
            backgroundImage: "url(/bg.svg)",

            backgroundSize: "cover",
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
