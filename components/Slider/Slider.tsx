import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import BackgroundImages from "./BackgroundImages";
import SocialMedia from "../SocialMedia/SocialMedia";
import clsx from "clsx";

export default function Slider({ images, locale }: any) {
  const t = useTranslations("Home");

  return (
    <div
      className="w-full h-[calc(100vh-4rem)] flex flex-row items-center justify-center relative overflow-clip"
      style={{ maxHeight: 1100 }}
    >
      <BackgroundImages images={images} />

      <section
        style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        className="absolute w-full h-full flex items-center justify-center flex-col-reverse lg:flex-row-reverse"
      >
        <section className="hidden lg:grid grid-cols-2 md:grid-cols-2 gap-2 justify-center px-5 pt-3 flex-1 lg:flex-[2] xl:flex-[2]"></section>

        <section className="w-full relative top-1/2 -translate-y-[50vh] lg:top-0 lg:-translate-y-2 p-5 md:w-10/12 lg:w-4/5 z-40 flex-[3] justify-center items-center lg:items-start flex flex-col ">
          <h1
            className={clsx(
              "text-white mt-16 xs:mt-0 text-4xl sm:text-5xl lg:text-6xl  3xl:text-7xl font-bold sm:text-start",
              {
                "2xl:text-6xl": !["de", "ru", "tr"].includes(locale),
              }
            )}
          >
            {t.rich("heading", {
              span: (text) => (
                <span className="text-blue-500 font-extrabold">
                  Visbro Personal Solutions
                </span>
              ),
            })}
          </h1>

          <p className="w-full mt-5 text-md sm:!text-xl 2xl:w-3/4 text-zinc-100 rtl:text-xl max-w-3xl">
            {t("text.short_about")}
          </p>

          <div className="mt-5 flex gap-3 justify-center flex-col xs:flex-row flex-wrap w-full max-w-3xl">
            <Link
              href={"/about-us"}
              className="flex-1 bg-white text-center text-black p-2 py-4 rounded-md hover:bg-zinc-200"
            >
              {t("buttons.learn_more")}
            </Link>
            <Link
              href={"/job-offers"}
              className="flex-1 bg-blue-800 hover:bg-blue-950 transition-colors text-blue-100 text-center py-4 p-2 rounded-md"
            >
              {t("buttons.offers")}
            </Link>
          </div>
        </section>
      </section>
      <div className="absolute bottom-5 right-5 hidden md:block">
        <SocialMedia />
      </div>
    </div>
  );
}
