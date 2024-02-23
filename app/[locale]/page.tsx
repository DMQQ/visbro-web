import Slider from "@/components/Slider/Slider";
import { unstable_setRequestLocale } from "next-intl/server";

import img1 from "@/public/slider/AmazonDriver.jpg";
import img2 from "@/public/slider/Delivery.jpg";
import img3 from "@/public/slider/FarmField.jpg";
import img4 from "@/public/slider/Forklift.jpg";
import img5 from "@/public/slider/Gastro2.jpg";
import img6 from "@/public/slider/Warehouse.png";

const defaultImages = [img1, img2, img3, img4, img5, img6];

import { getTranslations } from "next-intl/server";
import Ad from "@/components/Home/Ad";
import JobOffersPreview from "@/components/Home/JobOffersPreview";
import PartnersList from "@/components/Home/PartnersList";
import WhyUs from "@/components/Home/WhyUs";

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
  //const offers = await fetchBestOffers();

  return (
    <main className="w-full">
      <Slider images={defaultImages} />

      <WhyUs />

      <Ad />

      <JobOffersPreview locale={locale} />
      <PartnersList />
    </main>
  );
}
