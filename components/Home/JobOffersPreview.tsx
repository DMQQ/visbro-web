import { dummyJobData } from "@/dummyData";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function JobOffersPreview(props: {
  data: (typeof dummyJobData)[0][];
}) {
  const t = useTranslations("Home");
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
          {props.data.map((offer) => (
            <section
              key={offer.name}
              style={{ borderWidth: 0.5 }}
              className="dark:bg-zinc-950 flex-shrink w-full p-4 rounded-2xl flex flex-col border-zinc-900"
            >
              <Image
                width={300}
                height={200}
                src="/slider/Forklift.jpg"
                alt="offer image"
                className="w-full rounded-md"
              />
              <div className="flex-1">
                <h3 className="mt-2 text-lg">{offer.name}</h3>
                <p className="text-zinc-300 mt-2">
                  {offer.content.slice(0, 100)}
                </p>
                {/* <span className="text-zinc-300 mt-1">$20</span> */}
                <ul className="mt-2">
                  {offer.benefits.map((benefit) => (
                    <li key={benefit} className="text-zinc-300">
                      💵 {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={"/job-offers/offer/" + offer.offerId}
                className="mt-5 bg-blue-900 transition-colors hover:bg-blue-950 active:bg-blue-800 text-blue-100 text-md p-2 py-3 text-center rounded-md ho"
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
