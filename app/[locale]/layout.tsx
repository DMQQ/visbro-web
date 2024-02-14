import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader/AppHeader";
import AppFooter from "@/components/AppFooter/AppFooter";
import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { locales } from "@/locales";
import { unstable_setRequestLocale } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Visbro Personal Solution",
  description: "",
};

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
    <html lang={params.locale || "en"} className="dark ">
      <NextIntlClientProvider locale={params.locale} messages={messages}>
        <Body locale={params.locale}>{children}</Body>
      </NextIntlClientProvider>
    </html>
  );
}

const Body = ({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) => (
  <body
    className={`${inter.className} bg-white text-black dark:dark:bg-zinc-950 dark:text-white`}
    style={{
      backgroundImage: "url(/bg.svg)",
    }}
  >
    <AppHeader />
    <main className="mt-16">{children}</main>

    <AppFooter locale={locale} />
  </body>
);

export default RootLayout;
