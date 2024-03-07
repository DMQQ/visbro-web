import { Link } from "@/navigation";
import { JobOfferNinox, NinoxResponse } from "@/types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

async function fetchBestOffers(locale: string) {
  "use server";
  try {
    const res = await fetch(process.env.BASE_API_URL + "/JobOffers/records", {
      headers: {
        Authorization: "Bearer " + process.env.AUTH_TOKEN,
      },
      next: {
        revalidate: 3600,
      },
    });

    const data = (await res.json()) as JobOfferNinox[];

    return data
      ?.filter((dt) => dt.fields.lang === locale)
      .slice(0, 4)
      ?.map((field: any) => ({
        ...field.fields,
        offerId: field.id,
      }));
  } catch (error) {
    return [];
  }
}

export default async function JobOffersPreview(props: { locale: string }) {
  const t = await getTranslations("Home");

  const offers = await fetchBestOffers(props.locale);

  return (
    <article className="w-full p-5 mt-32 flex justify-center items-center">
      <section className="w-full lg:w-3/4 ">
        <h3 className="text-white text-4xl lg:text-6xl font-bold text-center">
          {t("headings.top3")}
        </h3>

        <div
          className="grid gap-5 mt-16"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {offers.map((offer: any, index) => (
            <section
              key={offer.name}
              style={{ borderWidth: 0.5 }}
              className="dark:bg-zinc-950 flex-shrink w-full p-4 rounded-2xl flex flex-col border-zinc-900"
            >
              <Image
                priority={false}
                width={300}
                height={200}
                src={
                  offer.image
                    ? `/${props.locale}/api/images/${offer.offerId}/${offer.image}`
                    : "/slider/Forklift.jpg"
                }
                alt="offer image"
                className="w-full rounded-md max-h-52 sm:max-h-48 object-cover"
              />
              <div className="flex-1">
                <h3 className="mt-2 text-xl font-bold">
                  {offer?.name?.slice(0, 100)}
                </h3>
                <p className="text-zinc-300 mt-2">
                  {offer?.content?.slice(0, 100)}
                </p>

                <ul className="mt-2 list-disc ps-5">
                  {offer?.benefits
                    ?.split(";")
                    ?.slice(0, 2)
                    ?.map((benefit: string) => (
                      <li key={benefit} className="text-zinc-100 mb-2">
                        {benefit}
                      </li>
                    ))}
                </ul>
              </div>
              <Link
                locale={props.locale}
                href={"/job-offers/offer/" + offer.offerId}
                className="mt-2 bg-blue-900 transition-colors hover:bg-blue-950 active:bg-blue-800 text-blue-100 text-md p-2 py-3 text-center rounded-md ho"
                about={`Job offer ${offer.name}`}
              >
                {t("buttons.offer")}
              </Link>
            </section>
          ))}
        </div>
      </section>
    </article>
  );
}
