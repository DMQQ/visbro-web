import { Link } from "@/navigation";
import Search from "./Search";
import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: "JobOffers" });

  return {
    title: t("heading"),
  };
}

export default function JobOffers({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("JobOffers");
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

        {[0, 1, 2, 3].map((key) => (
          <article
            key={key}
            className="mt-3 flex flex-col md:flex-row gap-3 rounded-xl bg-zinc-900  p-4 transition duration-200"
          >
            <img
              src="/car-rental-concept-illustration_114360-9267.avif"
              alt="offer thumbnail"
              className=" w-full sm:w-52 rounded-md object-cover"
            />
            <section className="flex flex-col">
              <h2 className="font-bold text-xl">Offer name</h2>
              <p className="text-zinc-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                nemo, alias molestiae, est ea tenetur quod a voluptas dolor
                dolorum neque illo vel cupiditate nihil. Eius cumque neque
                laboriosam mollitia!
              </p>

              <div className="flex flex-row justify-between flex-1 items-end">
                <ul>
                  <li>🏠 Remote</li>
                  <li>💵 $25/h</li>
                  <li>⏱️ Part time</li>
                </ul>
                <Link
                  href={"/job-offers/offer/" + key}
                  className="p-2 bg-blue-600 rounded-md w-48 text-center hover:bg-blue-700 active:bg-blue-700"
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
