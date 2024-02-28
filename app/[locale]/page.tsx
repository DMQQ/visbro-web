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
  ["Farm.webp", "Farm-screen-md.webp", "Farm-screen-sm.webp"],
  ["FarmField.webp", "FarmField-screen-md.webp", "FarmField-screen-sm.webp"],
  ["Forklift.webp", "Forklift-screen-md.webp", "Forklift-screen-sm.webp"],
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
    title: "Visbro Personal Solution",
    description: t("text.short_about"),
  };
}

export default async function Home({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);

  return (
    <main className="w-full">
      <Slider images={images} />

      <WhyUs />

      <Ad />

      <JobOffersPreview locale={locale} />
      <PartnersList />
    </main>
  );
}
