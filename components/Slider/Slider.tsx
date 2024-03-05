import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import BackgroundImages from "./BackgroundImages";
import SocialMedia from "../SocialMedia/SocialMedia";

export default function Slider({ images }: any) {
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
        <section className="hidden lg:grid grid-cols-2 md:grid-cols-2 gap-2 justify-center px-5 mb-5 flex-1 lg:flex-[2] xl:flex-[2]">
          {["Gastro.webp", "Tiles.webp", "Delivery.webp", "Amazon.webp"].map(
            (src) => (
              <Image
                quality={"100"}
                width={300}
                height={288}
                priority
                key={src}
                src={"/home_tiles/" + src}
                alt="Work image"
                className="object-cover h-72 w-full"
              />
            )
          )}
        </section>

        <section className="w-full relative top-1/2 -translate-y-[50vh] lg:top-0 lg:-translate-y-2 p-5 md:w-10/12 lg:w-4/5 z-40 xl:w-1/2 flex-[3] xl:flex-[2] justify-center items-center lg:items-start flex flex-col ">
          <h1 className="text-white mt-16 xs:mt-0 text-4xl sm:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center sm:text-start">
            {t.rich("heading", {
              span: (text) => (
                <span className="text-blue-500 font-extrabold">
                  Visbro Personal Solutions
                </span>
              ),
            })}
          </h1>

          <p className="w-full mt-5 max-w-screen-md text-md sm:!text-xl 2xl:w-3/4 text-zinc-300 rtl:text-xl">
            {t("text.short_about")}
          </p>

          <div className="mt-5 flex gap-3 justify-center flex-col xs:flex-row flex-wrap w-full sm:w-2/3 2xl:w-3/4">
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
