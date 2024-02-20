import { useTranslations } from "next-intl";
import Slider from "@/components/Slider/Slider";
import { unstable_setRequestLocale } from "next-intl/server";

import img1 from "@/public/slider/p1.webp";
import img2 from "@/public/slider/p2.png";
import img3 from "@/public/slider/p3.avif";
import img4 from "@/public/slider/p4.jpg";

const defaultImages = [img1, img2, img3, img4];

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
    openGraph: {
      images: [
        "/slider/p1.webp",
        "/slider/p2.png",
        "/slider/p3.avif",
        "/slider/p4.jpg",
      ],
    },
  };
}

export default function Home({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Home");

  return (
    <main className="w-full">
      <Slider images={defaultImages} />

      <WhyUs />

      <Ad />

      <JobOffersPreview data={[0, 1, 2, 3, 5]} />
      <PartnersList />
    </main>
  );
}
