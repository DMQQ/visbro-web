import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Slider from "@/components/Slider/Slider";
import Partners from "@/components/Partners/Partners";
import { unstable_setRequestLocale } from "next-intl/server";

import img1 from "@/public/slider/p1.webp";
import img2 from "@/public/slider/p2.png";
import img3 from "@/public/slider/p3.avif";
import img4 from "@/public/slider/p4.jpg";

import Image from "next/image";
import why_us from "@/public/why_us.webp";
import { Suspense } from "react";

const defaultImages = [img1, img2, img3, img4];

import { getTranslations } from "next-intl/server";
import Ad from "@/components/SelfAd/Ad";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: "Visbro Personal Solution",
    description: t("text.short_about"),
  };
}

export default function Home({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Home");

  return (
    <main className="w-full">
      <Slider images={defaultImages} />

      <article className="p-5 mt-32">
        <section className="w-full sm:p-5 flex flex-col mx-auto gap-10 md:flex-row items-center dark:dark:bg-zinc-950 rounded-xl lg:w-10/12 xl:w-9/12 2xl:w-3/4">
          <div className="flex-1 flex flex-col items-start 2xl:mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 uppercase">
              {t("headings.why_us")}
            </h2>

            <p className="text-zinc-300 w-full text-md">{t("text.why_us")}</p>
          </div>
          <div className="div flex flex-1 h-full w-full">
            <Image
              src={why_us}
              alt="Placeholder"
              priority
              className="rounded-md max-h-72 w-full object-cover"
            />
          </div>
        </section>
      </article>

      <Ad />

      <article className="w-full p-5 mt-32 flex justify-center items-center">
        <section className="w-full lg:w-3/4 ">
          <h3 className="text-white text-4xl lg:text-6xl font-bold text-center">
            {t("headings.top3")}
          </h3>

          <div
            className="grid gap-5 mt-16"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            }}
          >
            {[0, 1, 2, 3, 4].map((key) => (
              <section
                key={key}
                className="dark:bg-zinc-950  w-full p-4 rounded-2xl flex flex-col"
              >
                <Image
                  width={300}
                  height={200}
                  src="/car-rental-concept-illustration_114360-9267.avif"
                  alt="offer image"
                  className="w-full rounded-md"
                />
                <h3 className="mt-2 text-lg">Placeholder</h3>
                <p className="text-zinc-400 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  eius assumenda,
                </p>
                <span className="text-zinc-400 mt-1">$20/h </span>
                <Link href={"/job-offers/0"} className="mt-2" about="">
                  {t("buttons.learn_more")}
                </Link>
              </section>
            ))}
          </div>
        </section>
      </article>
      <article className="w-full p-5 mt-32 mb-16">
        <h4 className="text-white text-4xl lg:text-6xl font-bold text-center">
          {t("headings.trusted_us")}
        </h4>

        <Suspense>
          <Partners />
        </Suspense>
      </article>
    </main>
  );
}
