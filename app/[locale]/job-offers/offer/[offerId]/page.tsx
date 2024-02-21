import ApplicationModal from "@/components/ApplicationModal/ApplicationModal";
import ApplicationPanel from "./ApplicationPanel";
import { unstable_setRequestLocale } from "next-intl/server";
import axios from "axios";
import { getTranslations } from "next-intl/server";
import { locales } from "@/locales";
import { useTranslations } from "next-intl";

async function getOfferIds() {
  try {
    const response = await axios.get("/offers");
    return response.data.map((offer: any) => offer.id);
  } catch (error) {
    return ["0", "1", "2", "3"];
  }
}

export async function generateStaticParams() {
  const jobOffers = await getOfferIds();

  const params = [] as { locale: string; offerId: string }[];

  for (let offer in jobOffers) {
    for (let locale in locales) {
      params.push({ locale, offerId: offer });
    }
  }

  return params;
}

async function getOfferById(id: string, locale: string) {
  const data = await axios.get("/posts/" + id, {
    headers: {
      language: locale,
    },
  });

  return data.data;
}

export async function generateMetadata({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  return {
    title: "Job Offer ",
  };
}

export default async function OfferPage({
  searchParams,
  params: { locale },
}: any) {
  unstable_setRequestLocale(locale);

  const data = await new Promise((res) => setTimeout(res, 100));

  const t = getTranslations("JobOffers");

  return (
    <main className={`w-full h-full min-h-screen`}>
      <article
        className="flex flex-col md:flex-row mx-auto lg:w-11/12 xl:w-4/6 gap-5 dark:bg-zinc-900 rounded-lg sm:mt-32"
        style={{
          //   marginTop: "8rem",
          marginBottom: "4rem",
        }}
      >
        <section className="flex-2 p-5 rounded-lg h-auto">
          <h1 className="font-bold text-6xl my-5 mb-10">Offer title</h1>

          <article className="p-2 mt-5">
            <h2 className="font-bold text-xl">Wymagania</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 p-2">
              <li>🏠 Remote/On-site</li>
              <li>💵 $25/h</li>
              <li>⏱️ Full-time/Part-time</li>
              <li>👅 English/Polish/German</li>
              <li>🏠 Housing included</li>
              <li>🚗 Work car</li>
              <li>🍉 Fruit thursdays</li>
              <li>🏥 Health care included</li>
              <li>Much moree ....</li>
            </ul>
          </article>

          <div className="p-2 mt-5">
            <h2 className="font-bold text-xl">Position description</h2>

            <p className="p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              autem voluptatum aliquam? Ipsum autem quaerat a iusto consectetur
              quidem officiis eligendi necessitatibus minus, aspernatur, nobis
              laboriosam quam adipisci perspiciatis accusamus?
            </p>
            <p className="p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              autem voluptatum aliquam? Ipsum autem quaerat a iusto consectetur
              quidem officiis eligendi necessitatibus minus, aspernatur, nobis
              laboriosam quam adipisci perspiciatis accusamus?
            </p>
            <p className="p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              autem voluptatum aliquam? Ipsum autem quaerat a iusto consectetur
              quidem officiis eligendi necessitatibus minus, aspernatur, nobis
              laboriosam quam adipisci perspiciatis accusamus?
            </p>
            <p className="p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              autem voluptatum aliquam? Ipsum autem quaerat a iusto consectetur
              quidem officiis eligendi necessitatibus minus, aspernatur, nobis
              laboriosam quam adipisci perspiciatis accusamus?
            </p>
          </div>

          <div className="mt-5">
            <h2 className="font-bold text-xl">Work images</h2>

            <section className="grid grid-cols-2 gap-2 p-2">
              {[0, 1, 2, 3].map((key) => (
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
        <ApplicationPanel />
      </article>

      {searchParams.modal === "true" && <ApplicationModal />}
    </main>
  );
}
