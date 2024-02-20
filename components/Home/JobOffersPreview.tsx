import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function JobOffersPreview(props: { data: any[] }) {
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
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          }}
        >
          {props.data.map((key) => (
            <section
              key={key}
              className="dark:bg-zinc-950  w-full p-4 rounded-2xl flex flex-col"
            >
              <Image
                width={300}
                height={200}
                src="/car-rental-concept-illustration_114360-9267.avif"
                alt="offer image"
                className="w-full rounded-md"
              />
              <h3 className="mt-2 text-lg">Placeholder</h3>
              <p className="text-zinc-400 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab eius
                assumenda,
              </p>
              <span className="text-zinc-400 mt-1">$20/h </span>
              <Link href={"/job-offers/0"} className="mt-2" about="">
                {t("buttons.learn_more")}
              </Link>
            </section>
          ))}
        </div>
      </section>
    </article>
  );
}
