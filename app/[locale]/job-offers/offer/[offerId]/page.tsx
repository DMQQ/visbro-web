import ApplicationModal from "@/components/ApplicationModal/ApplicationModal";
import ApplicationPanel from "./ApplicationPanel";
import { unstable_setRequestLocale } from "next-intl/server";
import axios from "axios";
import { locales } from "@/locales";
import { dummyJobData } from "@/dummyData";

async function getOfferIds() {
  try {
    const response = await axios.get(
      process.env.BASE_API_URL + "/collaboration/query",

      {
        headers: {
          Authorization: "Bearer " + process.env.AUTH_TOKEN,
        },
      }
    );

    return response.data.map((field: any) => ({ offerId: field.id }));
  } catch (error) {
    return dummyJobData.map(({ offerId }) => offerId);
  }
}

export async function generateStaticParams() {
  const jobOffers = await getOfferIds();

  const params = [] as { locale: string; offerId: string }[];

  for (let offer of jobOffers) {
    for (let locale of locales) {
      params.push({ locale, offerId: offer });
    }
  }

  return params;
}

async function getOfferById(id: string, locale: string) {
  try {
    const res = await fetch(
      process.env.BASE_API_URL + "/JobOffers/records/" + id,
      {
        headers: {
          Authorization: "Bearer " + process.env.AUTH_TOKEN,
        },
      }
    );

    const data = await res.json();

    return data.fields;
  } catch (error) {
    return dummyJobData.find((d) => d.offerId === id);
  }
}

export async function generateMetadata({ params: { locale, offerId } }: any) {
  unstable_setRequestLocale(locale);

  const data = await getOfferById(offerId, locale);

  return {
    title: data?.name + "- Visbro Personal Solution",
    description: data?.content,
  };
}

export default async function OfferPage({
  searchParams,
  params: { locale, offerId },
}: any) {
  unstable_setRequestLocale(locale);

  const data = await getOfferById(offerId, locale);

  //const t = getTranslations("JobOffers");

  return (
    <main className={`w-full h-full min-h-screen sm:pb-16`}>
      <article className="flex flex-col md:flex-row mx-auto lg:w-11/12 xl:w-4/6 gap-5 dark:bg-zinc-900 rounded-lg sm:mt-32">
        <section className="flex-2 p-5 rounded-lg h-auto">
          <h1 className="font-bold text-2xl md:text-3xl xl:text-5xl my-5 mb-10 text-wrap break-words">
            {data?.name}
          </h1>

          <article className="p-2 mt-5">
            <h2 className="font-bold text-md">Wymagania</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 mt-2">
              <li>🏠 Remote/On-site</li>
              <li>💵 $25/h</li>
              <li>⏱️ Full-time/Part-time</li>
              <li>👅 English/Polish/German</li>
              <li>🏠 Housing included</li>
              <li>🚗 Work car</li>
              <li>🍉 Fruit thursdays</li>
              <li>🏥 Health care included</li>
              <li>Much moree ....</li>
              {/* {[...data!.benefits, ...data!.benefits].map((benefit, index) => (
                <li className="mt-2" key={index}>
                  🍊 {benefit}
                </li>
              ))} */}
            </ul>
          </article>

          <div className="mt-5">
            <h2 className="font-bold text-md">Position description</h2>

            <p className="mt-2">{data?.content}</p>
            <p className="mt-2">{data?.content}</p>
            <p className="mt-2">{data?.content}</p>
          </div>

          <div className="mt-10">
            <h2 className="font-bold text-md">Work images</h2>

            <section className="grid grid-cols-2 gap-2 mt-2">
              {[0, 1].map((key) => (
                <img
                  src="/car-rental-concept-illustration_114360-9267.avif"
                  key={key}
                  alt="placeholder"
                  className="rounded-md"
                />
              ))}
            </section>
          </div>
        </section>
        <ApplicationPanel offerId={offerId} />
      </article>

      {searchParams.modal === "true" && (
        <ApplicationModal offerTitle={data?.name} offerId={offerId} />
      )}
    </main>
  );
}
