import { useTranslations } from "next-intl";
import Image from "next/image";
import why_us from "@/public/Specjalisci2.png";

export default function WhyUs() {
  const t = useTranslations("Home");
  return (
    <article className="p-5 mt-20">
      <section className="w-full sm:p-5 flex flex-col mx-auto gap-10 md:flex-row items-center dark:bg-zinc-950 rounded-xl lg:w-10/12 xl:w-9/12 2xl:w-3/4">
        <div className="flex-1 flex flex-col items-start 2xl:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 uppercase md:rtl:text-5xl">
            {t("headings.why_us")}
          </h2>

          <p className="text-zinc-200 w-full text-md rtl:text-xl">
            {t("text.why_us")}
          </p>
        </div>
        <div className="div flex flex-1 h-full w-full">
          <Image
            src={why_us}
            alt="Placeholder"
            priority
            className="rounded-md max-h-72 w-full object-cover"
          />
        </div>
      </section>
    </article>
  );
}
