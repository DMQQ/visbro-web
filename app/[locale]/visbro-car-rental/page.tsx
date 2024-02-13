import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import { useTranslations } from "next-intl";

import { Link } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

export default function CarRental({ params: { locale } }: any) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Rental");
  return (
    <PageWrapper>
      <section className="w-full md:w-1/2 my-12 mx-auto p-5">
        <h1 className="text-5xl font-bold mt-10">{t("header_title")}</h1>
        <p className="text-zinc-400 px-2">{t("header_helper")}</p>

        <article className="flex flex-row flex-1 w-full gap-2 mt-5 flex-wrap">
          {t("car_options")
            .split(";")
            .map((text) => (
              <button
                key={text}
                className="dark:bg-zinc-900 p-3 text-sm rounded-lg"
              >
                {text}
              </button>
            ))}
        </article>

        <article className="mt-5 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from(new Array(6).keys()).map((key) => (
            <section className="dark:bg-zinc-900 p-3 rounded-lg" key={key}>
              <img
                src="https://weudealerimagesprd.blob.core.windows.net/pl3076/stockvehicles/35702_4f319c5d-311a-4ebf-9046-da28ff57c766.jpg"
                alt=""
                className="mb-2 rounded-md"
              />
              <h4>Porsche</h4>
              <p className="text-zinc-300 text-sm my-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Veritatis <br />
                💵$2500/day 💵deposit
              </p>
              <Link href={"/visbro-car-rental"} className=" text-sm">
                Learn more
              </Link>
            </section>
          ))}
        </article>
      </section>
    </PageWrapper>
  );
}
