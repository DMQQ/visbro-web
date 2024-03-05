import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Ad() {
  const keys = ["recruting", "cleaning", "legal"];
  const images = [
    "/home/people.jpg",
    "/home/cleaningCut.jpg",
    "/home/legalCut.jpg",
  ];

  const t = useTranslations("Home.ad");

  return (
    <article className="w-full p-5 mt-32 flex justify-center items-center">
      <section className="w-full xl:w-3/4 flex flex-col">
        <h3 className="m-auto text-4xl lg:text-6xl font-bold ">
          {t("heading")}
        </h3>

        {keys.map((el, index) => (
          <div
            key={el[index]}
            className={clsx(
              "div flex flex-col-reverse md:flex-row mt-16 bg-zinc-950 md:p-5 rounded-2xl",
              {
                "md:!flex-row-reverse": index % 2 === 0,
                "!mt-32": index !== 0,
              }
            )}
          >
            <Image
              width={600}
              height={390}
              src={images[index]}
              alt={"Decorative image"}
              className="w-full md:w-1/2 object-cover max-h-96 rounded-md mt-5 md:mt-0"
            />
            <div
              className={clsx("flex-1", {
                "md:pe-5": index % 2 === 0,
                "md:ps-5": index % 2 === 1,
              })}
            >
              <h3
                // bg-gradient-to-r from-blue-500 via-purple-500 to-purple-800 inline-block text-transparent bg-clip-text
                className="font-bold uppercase text-xl md:text-2xl lg:text-3xl lg:rtl:text-4xl"
              >
                {t(`${el}.heading`)}
              </h3>

              <p className="text-zinc-300 mt-2 rtl:text-lg">
                {t(`${el}.subheading`)}
              </p>

              <p className="text-zinc-100 mt-5 rtl:text-xl">
                {t(`${el}.content`)}
              </p>
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
