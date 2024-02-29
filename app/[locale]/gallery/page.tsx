import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Gallery" });

  return {
    title: t("heading"),
  };
}

const images = [
  "/gallery/2.JPG",
  "/gallery/3.JPG",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
  "/gallery/7.jpg",
  "/gallery/8.jpg",
  "/gallery/9.jpg",
  "/gallery/1.JPG",
  "/gallery/10.jpg",
  "/gallery/11.jpg",
  "/gallery/12.jpg",
  "/gallery/13.jpg",
  "/gallery/14.jpg",
  "/gallery/15.jpg",
  "/gallery/16.jpg",
  "/gallery/17.jpg",
  "/gallery/18.jpg",
  "/gallery/19.jpg",
  "/gallery/21.jpg",
  "/gallery/22.jpg",
  "/gallery/23.jpg",
  "/gallery/24.jpg",
  "/gallery/25.jpg",
  "/gallery/26.jpg",
];

export default function Gallery({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Gallery");
  return (
    <PageWrapper>
      <article className="p-5 rounded-md w-full md:w-4/5 lg:w-2/3 m-auto">
        <div className="mb-10">
          <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold ">
            {t("heading")}
          </h1>
          <p className="text-zinc-300 mt-2">{t("heading_helper")}</p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {images.map((src, key) => (
            <Image
              width={400}
              height={400}
              quality={90}
              priority={key < 6}
              key={key}
              src={src}
              alt="Image of our company and it's work"
              className="w-full h-full rounded-md object-cover"
            />
          ))}
        </section>
      </article>
    </PageWrapper>
  );
}
