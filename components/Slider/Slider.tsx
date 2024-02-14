"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import tile1 from "@/public/home_tiles/app-development-illustration_52683-47743.avif";
import tile2 from "@/public/home_tiles/car-rental-concept-illustration_114360-9267.avif";

interface SliderProps {
  images: StaticImageData[];
}

const socials = [
  "/socials/TikTok.png",
  "/socials/Youtube.png",
  "/socials/Facebook.png",
  "/socials/Instagram.png",
];

// OPTIMIZE BACKGROUND IMAGES
// https://stackoverflow.com/questions/74496858/how-to-change-next-image-according-to-screen-size

const INTERVAL = 3500;
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
    <div className="w-full min-h-screen flex flex-row relative overflow-clip">
      <div
        className={`flex transition ease-out duration-500`}
        style={{
          transform: `translateX(-${currentImage * 100}vw)`,
        }}
      >
        {images.map((image, index) => (
          <div className="w-screen h-screen relative" key={index}>
            <Image
              quality={95}
              width={1200}
              height={800} // ? troche psuje performance
              priority={index === 0}
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              src={image}
              alt="Background image"
              className="w-screen h-screen object-cover"
            />
            {/* <img
              src={image.src}
              alt="Background image"
              className="w-screen h-screen object-cover"
            /> */}
          </div>
        ))}
      </div>

      {/* <section className="absolute left-0 top-1/2 hidden -translate-y-2/3 z-20  p-2 gap-2 md:flex flex-col">
        {["TikTok", "YouTube", "Facebook", "Instagram"].map((social) => (
          <a href="#" key={social}>
            <Image
              src={"/socials/" + social + ".png"}
              width={40}
              height={30}
              alt={social}
              className="w-auto h-auto"
            />
          </a>
        ))}
      </section> */}

      <section
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        className="absolute w-full h-full flex items-center justify-center flex-col-reverse lg:flex-row"
      >
        <section className="hidden lg:grid grid-cols-2 md:grid-cols-2 gap-3 justify-center px-5 mb-5 flex-1 md:flex-[2]">
          {[1, 2, 3, 4].map((key) => (
            <Image
              priority={false}
              key={key}
              src={key % 3 === 0 ? tile1 : tile2}
              alt="Work image"
              className="object-fit "
            />
          ))}
        </section>

        <section
          // relative top-1/2 -translate-y-2/3 lg:top-0 lg:-translate-y-2

          className="w-full relative top-1/2 -translate-y-2/3 lg:top-0 lg:-translate-y-2  p-5 md:w-10/12 lg:w-4/5 z-50 xl:w-1/2 flex flex-col justify-center items-center flex-[3] mt-20"
        >
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center">
            Visbro Personal Solution
          </h1>
          <p className="w-full mt-5 sm:w-2/3 text-md xs:text-lg text-white">
            {t("text.short_about")}
          </p>

          <div className="mt-5 flex xs:gap-5 gap-3 justify-center  flex-row w-full">
            {socials.map((social, index) => (
              <a href="#" key={index}>
                <Image
                  priority
                  src={social}
                  width={40}
                  height={30}
                  alt={"social"}
                  className="w-auto h-auto"
                />
              </a>
            ))}
          </div>

          <div className="mt-5 flex gap-3 justify-center flex-col w-full xs:flex-row ">
            <Link
              href={"/about-us"}
              className="w-full bg-white xs:w-48 text-center text-black p-2 py-4 rounded-md"
            >
              {t("buttons.learn_more")}
            </Link>
            <Link
              href={"/job-offers"}
              className="w-full dark:bg-zinc-950 text-white xs:w-48 text-center  p-2 py-4 rounded-md"
            >
              {t("buttons.offers")}
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}
