"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import img1 from "@/public/slider/AmazonDriver.jpg";
import img3 from "@/public/slider/FarmField.jpg";
import img4 from "@/public/slider/Forklift.jpg";
import img5 from "@/public/slider/Gastro2.jpg";
import img6 from "@/public/slider/Warehouse.png";
import { usePathname } from "next/navigation";

const defaultImages = [img1, img3, img4, img5, img6];

export default function AboutSlider() {
  const [currentImage, setCurrentImage] = useState<number>(0); // index of a number

  useEffect(() => {
    let intv = setInterval(() => {
      setCurrentImage((prev) =>
        prev + 2 >= defaultImages.length ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(intv);
  }, []);

  const path = usePathname();

  const locale = path.split("/")[1] || "pl";

  const DIRECTION = locale === "ar" ? 1 : -1;

  return (
    <div className="w-full mt-10 overflow-hidden">
      <div
        className="w-full relative flex flex-row gap-5 transition duration-200 ease-in-out"
        style={{
          transform: `translateX(${currentImage * 31.25 * DIRECTION}rem)`,
        }}
      >
        {defaultImages.map((src, index) => (
          <div key={index} className="w-[30rem] flex-shrink-0 relative">
            <Image
              priority
              blurDataURL={src.blurDataURL}
              placeholder="blur"
              width={400}
              height={300}
              src={src}
              className="w-full select-none h-full object-cover"
              alt="Visbro image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
