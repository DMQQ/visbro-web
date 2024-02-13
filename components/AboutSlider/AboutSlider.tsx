"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import img1 from "@/public/slider/p1.webp";
import img2 from "@/public/slider/p2.png";
import img3 from "@/public/slider/p3.avif";
import img4 from "@/public/slider/p4.jpg";
import img5 from "@/public/slider/p5.jpg";

const defaultImages = [img1, img2, img3, img4, img5];

export default function AboutSlider() {
  const [currentImage, setCurrentImage] = useState<number>(0); // index of a number

  useEffect(() => {
    let intv = setInterval(() => {
      setCurrentImage((prev) =>
        prev + 1 >= defaultImages.length ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(intv);
  }, []);

  return (
    <div className="flex flex-row overflow-hidden w-full transition-transform duration-200 ease-in-out">
      {defaultImages.map((src, index) => (
        <div
          key={src.src}
          className="flex-shrink-0 w-full relative"
          style={{
            transform: `translateX(${currentImage * 100 * -1}%)`,
          }}
        >
          <Image
            priority={index === 0}
            blurDataURL={src.blurDataURL}
            placeholder="blur"
            width={400}
            height={300}
            src={src}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
