import { Link } from "@/navigation";
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import NextImage from "next/image";
import { TJobOffer } from "@/types";
import { keywords } from "@/seo";

const API = process.env.BASE_API_URL;

const TOKEN = process.env.AUTH_TOKEN;

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: "JobOffers" });

  return {
    title: t("heading") + " - Visbro Personal Solutions",
    description: "Visbro Job offers",
    keywords: keywords.index?.[locale as keyof typeof keywords.index],
  };
}

async function fetchOffers(locale: string) {
  try {
    const res = await fetch(API + `/JobOffers/records`, {
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      next: {
        revalidate: 3600,
      },
    });

    const data = await res.json();

    return data
      .map(
        (field: any) =>
          ({
            ...(field?.fields || {}),
            offerId: field.id,
          } as TJobOffer)
      )
      .filter((data: TJobOffer) => data.lang === locale)
      .reverse();
  } catch (error) {
    return [];
  }
}

export default async function JobOffers({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("JobOffers");

  const offers = (await fetchOffers(locale)) as TJobOffer[];

  return (
    <PageWrapper>
      <section className="mx-auto w-full rounded-lg lg:w-9/12 xl:w-2/3 p-5">
        <div className="mb-10">
          <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold ">
            {t("heading")}
          </h1>
        </div>

        {offers?.length === 0 && (
          <div className="flex justify-center items-center">
            <NextImage
              src={"/empty.svg"}
              alt="No offers available"
              width={800}
              height={800}
            />
          </div>
        )}

        {offers.map(
          ({ name, content, offerId, image, requirements }, index) => (
            <article
              key={index}
              className="mb-5 flex flex-col md:flex-row gap-3 rounded-2xl bg-zinc-950 border border-zinc-900 hover:bg-zinc-900 p-4 transition duration-200"
            >
              {image && (
                <Link
                  className="flex"
                  locale={locale}
                  href={
                    `/job-offers/offer/${offerId}/${name
                      .replace(" ", "-")
                      .replace("/", "-")
                      .toLowerCase()}` as any
                  }
                >
                  <img
                    // disable optimization until i figure out how to make it work with
                    // unoptimized
                    // priority
                    // width={300}
                    // height={200}
                    src={
                      image
                        ? `/${locale}/api/images/${offerId}/${image}`
                        : "/slider/Forklift.jpg"
                    }
                    alt="offer thumbnail"
                    className="md:max-w-64 rounded-md object-cover flex-1"
                  />
                </Link>
              )}
              <section className="flex flex-col flex-[4]">
                <h2 className="font-bold text-xl sm:text-2xl ">{name}</h2>
                <p className="text-zinc-400  block sm:hidden">
                  {content?.slice(0, 125)}
                </p>

                <p className="text-zinc-400 hidden sm:block">
                  {content?.slice(0, 300)}
                </p>

                <div className="flex flex-col sm:flex-row justify-between items-end flex-1 mt-2">
                  <ul className="w-full flex flex-col list-disc ps-5">
                    {requirements

                      .split(";")
                      ?.slice(0, 5)
                      .filter((val) => val.trim() !== "")
                      ?.map((b: string) => (
                        <li key={b} className="text-white text-sm mr-5">
                          {b}
                        </li>
                      ))}
                  </ul>

                  <Link
                    locale={locale}
                    href={
                      ("/job-offers/offer/" +
                        offerId +
                        "/" +
                        name
                          .replace(" ", "-")
                          .replace("/", "-")
                          .toLowerCase()) as any
                    }
                    className="p-2 bg-blue-900 transition-colors flex-shrink-0 max-h-12 hover:bg-blue-950 active:bg-blue-800 rounded-md text-blue-100 sm:!w-48 text-center  mt-5 sm:mt-0 w-full py-3"
                  >
                    {t("buttons.card.apply")}
                  </Link>
                </div>
              </section>
            </article>
          )
        )}
      </section>
    </PageWrapper>
  );
}
