import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Slider from "@/components/Slider/Slider";
import Partners from "@/components/Partners/Partners";
import Heading from "@/components/ui/Heading/Heading";
import { unstable_setRequestLocale } from "next-intl/server";

import img1 from "@/public/slider/p1.webp";
import img2 from "@/public/slider/p2.png";
import img3 from "@/public/slider/p3.avif";
import img4 from "@/public/slider/p4.jpg";
import img5 from "@/public/slider/p5.jpg";
import Image from "next/image";
import why_us from "@/public/why_us.webp";
import { Suspense } from "react";

const defaultImages = [img1, img2, img3, img4, img5];

export default function Home({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Home");

  return (
    <main className="w-full">
      <Slider images={defaultImages} />
      <article className="w-full p-5 flex flex-col mx-auto gap-10 lg:w-2/3 md:flex-row items-center dark:dark:bg-zinc-900 rounded-xl mt-20">
        <div className="flex flex-col flex-1">
          <h2 className="text-4xl font-bold mb-5">{t("headings.why_us")}</h2>

          <p className="text-zinc-300 w-full ">{t("text.why_us")}</p>
        </div>
        <div className="div flex flex-1 h-full">
          <Image
            src={why_us}
            alt="Placeholder"
            className="rounded-md h-72 w-full object-cover"
          />
        </div>
      </article>
      <Suspense>
        <article className="w-full p-5 my-20 flex justify-center items-center">
          <section className="w-full lg:w-2/3 ">
            <Heading>{t("headings.top3")}</Heading>

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
                  <p className="text-zinc-500 mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    eius assumenda,
                  </p>
                  <span className="text-zinc-500 mt-1">$20/h </span>
                  <Link href={"/job-offers"} className="mt-2">
                    {t("buttons.learn_more")}
                  </Link>
                </section>
              ))}
            </div>
          </section>
        </article>
        <article className="w-full p-5 my-16">
          <Heading>{t("headings.trusted_us")}</Heading>

          <Partners />
        </article>
      </Suspense>
    </main>
  );
}
