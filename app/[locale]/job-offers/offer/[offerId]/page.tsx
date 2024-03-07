import ApplicationModal from "@/components/ApplicationModal/ApplicationModal";
import ApplicationPanel from "./ApplicationPanel";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/locales";
import clsx from "clsx";
import { TJobOffer } from "@/types";
import { notFound } from "next/navigation";

async function getOfferIds() {
  try {
    const response = await fetch(
      process.env.BASE_API_URL + "/JobOffers/records",

      {
        next: {
          revalidate: 3600,
        },
        headers: {
          Authorization: "Bearer " + process.env.AUTH_TOKEN,
        },
      }
    );

    if (!response.ok) throw new Error("Response not ok");

    const data = await response.json();

    return data.map((field: any) => field.id);
  } catch (error) {
    return [];
  }
}

export async function generateStaticParams() {
  const jobOffers = (await getOfferIds()) as number[];

  const params = [] as { locale: string; offerId: string }[];

  for (let offer of jobOffers) {
    for (let locale of locales) {
      params.push({ locale, offerId: offer.toString() });
    }
  }

  return params;
}

async function getOfferById(id: string, locale: string): Promise<TJobOffer> {
  try {
    const res = await fetch(
      process.env.BASE_API_URL + `/JobOffers/records/${id}`,
      {
        headers: {
          Authorization: "Bearer " + process.env.AUTH_TOKEN,
        },
        next: {
          revalidate: 3600,
        },
      }
    );

    const data = await res.json();

    return data.fields;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params: { locale, offerId } }: any) {
  unstable_setRequestLocale(locale);

  const data = await getOfferById(offerId, locale);

  return {
    title: (data?.name || "Not found") + " - Visbro Personal Solution",
    description: data?.content,
  };
}

export default async function OfferPage({
  searchParams,
  params: { locale, offerId },
}: any) {
  unstable_setRequestLocale(locale);

  const data = await getOfferById(offerId, locale);
  const t = await getTranslations({
    locale,
    namespace: "JobOfferDetails.headings",
  });

  return (
    <>
      <main className={`w-full h-full min-h-screen sm:pb-16`}>
        <article
          className={clsx(
            "flex flex-col md:flex-row mx-auto lg:w-11/12 xl:w-4/6 gap-5 dark:bg-zinc-900 rounded-lg sm:mt-32",
            {
              hidden: data === undefined,
            }
          )}
        >
          <section className="flex-[3] p-5 rounded-lg h-auto">
            <h1 className="font-bold text-2xl md:text-3xl xl:text-5xl my-5 mb-10 text-wrap break-words">
              {data?.name}
            </h1>

            <article className="mt-5">
              <h2 className="font-bold text-lg mb-2">{t("requirements")}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 mt-2 list-disc ps-5 gap-5">
                {(data?.requirements?.split(";") as string[])?.map(
                  (req, index) => (
                    <li key={req + index}>{req}</li>
                  )
                )}
              </ul>
            </article>

            <article className="mt-5">
              <h2 className="font-bold text-lg mb-2">
                {t("responsibilities")}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 mt-2 list-disc ps-5 gap-5">
                {(data?.responsibilities?.split(";") as string[])?.map(
                  (res, index) => (
                    <li key={res + index}>{res}</li>
                  )
                )}
              </ul>
            </article>

            <article className="mt-5">
              <h2 className="font-bold text-lg mb-2">{t("benefits")}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 mt-2 list-disc ps-5 gap-5">
                {(data?.benefits?.split(";") as string[])?.map(
                  (benefit, index) => (
                    <li key={benefit + index}>{benefit}</li>
                  )
                )}
              </ul>
            </article>

            <div className="mt-5">
              <h2 className="font-bold text-lg mb-2">{t("description")}</h2>

              <p className="mt-2 text-lg">{data?.content}</p>
            </div>
          </section>
          <ApplicationPanel offerId={offerId} />
        </article>

        <article
          className={clsx(
            "hidden h-[50vh] w-full items-center justify-center",
            {
              "!flex flex-col": data === undefined,
            }
          )}
        >
          <h1 className="text-5xl font-bold">Offer not found</h1>
        </article>
      </main>
      {searchParams.modal === "true" && (
        <ApplicationModal
          offerTitle={data?.name}
          offerId={offerId + " - " + data?.name}
        />
      )}
    </>
  );
}
