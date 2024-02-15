"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import img1 from "@/public/slider/p1.webp";
import img2 from "@/public/slider/p2.png";
import img3 from "@/public/slider/p3.avif";
import img4 from "@/public/slider/p4.jpg";

const defaultImages = [img1, img2, img3, img4];

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

  return (
    <div className="w-full mt-10 overflow-hidden">
      <div
        className="w-full relative flex flex-row gap-5 transition duration-200 ease-in-out"
        style={{
          transform: `translateX(${currentImage * 31.25 * -1}rem)`,
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
