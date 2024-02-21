"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

interface SliderProps {
  images: StaticImageData[];
}

const socials = [
  "/socials/TikTok.png",
  "/socials/Youtube.png",
  "/socials/Facebook.png",
  "/socials/Instagram.png",
];

const socialLinks = [
  "https://www.tiktok.com/@visbro.personal.s?_t=8k2Ttg57UZM&_r=1",
  "#",
  "https://www.facebook.com/profile.php?id=61556830941642",
  "#",
];

const INTERVAL = 3000;
export default function Slider({ images }: SliderProps) {
  const [currentImage, setCurrentImage] = useState<number>(0); // index of a number

  useEffect(() => {
    let intv = setInterval(() => {
      setCurrentImage((prev) => (prev + 1 >= images.length ? 0 : prev + 1));
    }, INTERVAL);

    return () => clearInterval(intv);
  }, []);

  const t = useTranslations("Home");

  return (
    <div
      className="w-full h-[calc(100vh-4rem)] flex flex-row items-center justify-center relative overflow-clip"
      style={{ maxHeight: 900 }}
    >
      <div
        className={`absolute top-0 left-0 flex transition ease-out duration-500`}
        style={{
          transform: `translateX(-${currentImage * 100}vw)`,
        }}
      >
        {images.map((image, index) => (
          <div className="w-screen h-screen relative" key={index}>
            <Image
              // priority
              quality={100}
              width={1200}
              height={800} // ? troche psuje performance
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              src={image}
              alt="Background image"
              className="w-screen h-screen object-cover"
            />
          </div>
        ))}
      </div>

      <section className="absolute hidden xl:flex right-0 top-1/2 -translate-y-2/3  p-2 gap-2 flex-col z-50">
        {socials.map((social, index) => (
          <a
            href={socialLinks[index]}
            key={social}
            className="cursor-pointer"
            target="_blank"
            rel="nofollow"
          >
            {/* <Image
              priority
              src={social}
              width={30}
              height={30}
              alt={"social"}
              className="w-auto h-auto"
            /> */}
            <img src={social} alt={social} className="w-10" />
          </a>
        ))}
      </section>

      <section
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        className="absolute w-full h-full flex items-center justify-center flex-col-reverse lg:flex-row"
      >
        <section className="hidden lg:grid grid-cols-2 md:grid-cols-2 gap-3 justify-center px-5 mb-5 flex-1 lg:flex-[3] xl:flex-[2]">
          {["Cleaner.jpg", "Gastro.jpg", "Amazon.jpg", "LKW3.jpg"].map(
            (src) => (
              <Image
                quality={100}
                width={300}
                height={200}
                priority
                key={src}
                src={"/home_tiles/" + src}
                alt="Work image"
                className="object-cover h-72 w-full"
              />
            )
          )}
        </section>

        <section className="w-full relative top-1/2 -translate-y-[50vh] lg:top-0 lg:-translate-y-2 p-5 md:w-10/12 lg:w-4/5 z-40 xl:w-1/2 flex flex-col justify-center items-center flex-[3]">
          <h1 className="text-white mt-16 xs:mt-0 text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-center">
            Visbro Personal Solution
          </h1>
          <p className="w-full mt-5 max-w-screen-md text-md sm:!text-lg text-zinc-300">
            {t("text.short_about")}
          </p>

          <div className="mt-5 flex z-50 xl:hidden xs:gap-5 gap-3 justify-center flex-row w-full">
            {socials.map((social, index) => (
              <a
                href={socialLinks[index]}
                key={index}
                target="_blank"
                rel="nofollow"
              >
                {/* <Image
                  priority
                  src={social}
                  width={40}
                  height={30}
                  alt={"social"}
                  className="w-auto h-auto"
                /> */}
                <img src={social} alt={"social"} className="h-auto w-10" />
              </a>
            ))}
          </div>

          <div className="mt-5 flex gap-3 justify-center flex-col xs:flex-row flex-wrap w-full sm:w-2/3 2xl:w-1/2">
            <Link
              href={"/about-us"}
              className="flex-1 bg-white text-center text-black p-2 py-4 rounded-md"
            >
              {t("buttons.learn_more")}
            </Link>
            <Link
              href={"/job-offers"}
              className="flex-1 bg-zinc-950 text-white  text-center py-4 rounded-md"
            >
              {t("buttons.offers")}
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}
