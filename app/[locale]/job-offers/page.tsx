import { Link } from "@/navigation";
import Search from "./Search";
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import axios from "axios";
import { use } from "react";
import { off } from "process";
import { dummyJobData } from "@/dummyData";

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: "JobOffers" });

  return {
    title: t("heading"),
    description: "Visbro Job offers",
  };
}

async function fetchOffers(locale: string) {
  "use server";
  try {
    // const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    // return await response.json();

    return dummyJobData;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function JobOffers({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("JobOffers");

  const offers = (await fetchOffers(locale)) as any[];

  return (
    <PageWrapper>
      <section className="mx-auto w-full rounded-lg lg:w-9/12 xl:w-2/3 p-5">
        <div className="mb-10">
          <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold ">
            {t("heading")}
          </h1>
          <p className="text-zinc-300 mt-2">Lorem ipsum dolor sit amet?</p>
        </div>

        <Search />

        {offers.map(({ name, content, benefits, offerId }, index) => (
          <article
            key={index}
            className="mt-3 flex flex-col md:flex-row gap-3 rounded-xl bg-zinc-900  p-4 transition duration-200"
          >
            <Image
              priority
              width={300}
              height={200}
              src="/car-rental-concept-illustration_114360-9267.avif"
              alt="offer thumbnail"
              className=" w-full sm:w-52 rounded-md object-cover"
            />
            <section className="flex flex-col">
              <h2 className="font-bold text-xl">{name}</h2>
              <p className="text-zinc-400">{content}</p>

              <div className="flex flex-row justify-between flex-1 items-end">
                <ul>
                  {benefits?.map((b: string) => (
                    <li key={b} className="text-white text-sm ">
                      💵 {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={"/job-offers/offer/" + offerId}
                  className="p-2 bg-blue-900 rounded-md w-48 text-center hover:bg-blue-700 active:bg-blue-700"
                >
                  {t("buttons.card.apply")}
                </Link>
              </div>
            </section>
          </article>
        ))}
      </section>
    </PageWrapper>
  );
}
