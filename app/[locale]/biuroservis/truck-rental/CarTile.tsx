"use client";

import { cars } from "./cars";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function CarTile({ car }: { car: (typeof cars)[0] }) {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const path = usePathname();

  const locale = path.split("/")[1] || "pl";

  const DIRECTION = locale === "ar" ? 1 : -1;

  const next = () => {
    setCurrentImage((p) => (p + 1 < car.images.length ? p + 1 : 0));
  };

  const prev = () => {
    setCurrentImage((p) => (p - 1 >= 0 ? p - 1 : 0));
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    if (ref.current) setWidth(ref.current?.getBoundingClientRect().width);
  }, []);

  const buttonClassName =
    "bg-zinc-950 absolute z-50 rounded-full w-8 h-8 flex justify-center items-center -translate-y-1/2";

  const t = useTranslations("Rental");

  return (
    <section
      ref={ref}
      key={car.name}
      className="dark:bg-zinc-950 w-full p-4 rounded-xl flex flex-col overflow-hidden"
    >
      <div className="relative w-full overflow-hidden">
        <button
          onClick={() => prev()}
          className={`${buttonClassName} top-1/2 left-1 `}
        >
          <MdNavigateBefore size={25} color="white" />
        </button>

        <div
          className="flex w-full flex-row h-60 relative transition-transform duration-200 "
          style={{
            transform: `translateX(${
              currentImage * (width - 32) * DIRECTION
            }px)`,
          }}
        >
          {car.images.map((img, index) => (
            <div
              //    style={{ width: width - 32 }} // width of the tile minus padding
              key={img}
              className="w-full relative flex-shrink-0"
            >
              <Image
                quality={90}
                priority={index === 0}
                width={300}
                height={200}
                alt={car.name + " image"}
                src={img}
                className="select-none w-full flex-shrink-0 h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => next()}
          className={`${buttonClassName} top-1/2 right-1 `}
        >
          <MdNavigateNext />
        </button>
      </div>
      <h3 className="text-xl font-bold mt-5">{car.name}</h3>

      <ul className="grid grid-cols-2 mt-5 text-zinc-200 flex-1">
        {Object.entries(car.spec).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>

      <a
        className="mt-5 bg-blue-900 transition-colors hover:bg-blue-950 active:bg-blue-800 text-blue-100 text-md p-2 py-3 text-center rounded-md "
        href="tel:+49 1520 8941615"
      >
        {t("contact")}
      </a>
    </section>
  );
}
