import { Link } from "@/navigation";
import Search from "./Search";
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { unstable_setRequestLocale } from "next-intl/server";

import { getTranslations } from "next-intl/server";
import NextImage from "next/image";
import axios from "axios";
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
    const res = await axios.get(
      process.env.BASE_API_URL + "/JobOffers/records",
      {
        headers: {
          Authorization: "Bearer " + process.env.AUTH_TOKEN,
        },
      }
    );

    return res.data.map((field: any) => {
      return {
        offerId: field.id,
        ...(field?.fields || {}),
      };
    });
  } catch (error) {
    return dummyJobData;
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

        {/* <Search /> */}

        {offers.map(({ name, content, benefits, offerId, image }, index) => (
          <article
            key={index}
            className="mb-5 flex flex-col md:flex-row gap-3 rounded-xl bg-zinc-950 border border-zinc-900 hover:bg-zinc-900 p-4 transition duration-200"
          >
            <NextImage
              priority
              width={150}
              height={100}
              src={
                image
                  ? `/${locale}/api/images/${offerId}/${image}`
                  : "/slider/Forklift.jpg"
              }
              alt="offer thumbnail"
              className=" w-full md:w-52 max-h-52 sm:h-40 rounded-md object-cover flex-1"
            />
            <section className="flex flex-col flex-[4]">
              <h2 className="font-bold text-xl smtext-2xl">{name}</h2>
              <p className="text-zinc-400  block sm:hidden">
                {content.slice(0, 125)}
              </p>

              <p className="text-zinc-400 hidden sm:block">
                {content.slice(0, 300)}
              </p>

              <div className="flex flex-col sm:flex-row justify-between flex-1 items-end">
                <ul className="flex mt-2 sm:mt-0 flex-row sm:flex-col">
                  {["Fruit thursdays", "Pizza Mondays", "$50/h"].map(
                    (b: string) => (
                      <li
                        key={b}
                        className="text-white text-sm text-center sm:text-left"
                      >
                        💵 {b}
                      </li>
                    )
                  )}
                </ul>
                <Link
                  locale={locale}
                  href={"/job-offers/offer/" + offerId}
                  className="p-2 bg-blue-900 transition-colors hover:bg-blue-950 active:bg-blue-800 rounded-md text-blue-100 sm:!w-48 text-center  mt-5 sm:mt-0 w-full py-3"
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
