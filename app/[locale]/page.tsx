import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Slider from "@/components/Slider/Slider";
import Partners from "@/components/Partners/Partners";
import { unstable_setRequestLocale } from "next-intl/server";

import img1 from "@/public/slider/p1.webp";
import img2 from "@/public/slider/p2.png";
import img3 from "@/public/slider/p3.avif";
import img4 from "@/public/slider/p4.jpg";
import img5 from "@/public/slider/p5.jpg";
import img6 from "@/public/slider/p6.jpg";
import img7 from "@/public/slider/p7.jpg";

import Image from "next/image";
import why_us from "@/public/why_us.webp";
import { Suspense } from "react";

const defaultImages = [img1, img2, img3, img4, img5, img6, img7];

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: "Visbro Personal Solution",
    content: t("text.short_about"),
  };
}

export default function Home({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Home");

  return (
    <main className="w-full">
      <Slider images={defaultImages} />

      <section className="p-5 mt-16">
        <article className="w-full p-5 flex flex-col mx-auto gap-10 md:flex-row items-center dark:dark:bg-zinc-900 rounded-xl lg:w-10/12 xl:w-9/12 2xl:w-2/3">
          <div className="flex flex-col flex-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              {t("headings.why_us")}
            </h2>

            <p className="text-zinc-300 w-full text-md">{t("text.why_us")}</p>
          </div>
          <div className="div flex flex-1 h-full w-full">
            <Image
              src={why_us}
              alt="Placeholder"
              className="rounded-md max-h-72 w-full object-cover"
            />
          </div>
        </article>
      </section>

      <article className="w-full p-5 mt-16 flex justify-center items-center">
        <section className="w-full lg:w-2/3 ">
          <h3 className="text-white text-4xl lg:text-6xl font-bold text-center">
            {t("headings.top3")}
          </h3>

          <div
            className="grid gap-5 mt-16"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            }}
          >
            {[0, 1, 2, 3].map((key) => (
              <section
                key={key}
                className="dark:bg-zinc-900 w-full p-4 rounded-xl flex flex-col"
              >
                <img
                  src="/car-rental-concept-illustration_114360-9267.avif"
                  alt="offer image"
                  className="w-full rounded-md"
                />
                <h3 className="mt-2 text-lg">Placeholder</h3>
                <p className="text-zinc-300 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  eius assumenda,
                </p>
                <span className="text-zinc-300 mt-1">$20/h </span>
                <Link href={"/job-offers"} className="mt-2">
                  {t("buttons.learn_more")}
                </Link>
              </section>
            ))}
          </div>
        </section>
      </article>
      <article className="w-full p-5 mt-16">
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
