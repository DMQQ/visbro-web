"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
const partners = [
  "allegro.jpg",
  "amazon.JPG",
  "amica.jpg",
  "cargo.jpg",
  "dhl.jpg",
  "dino.jpg",
  "fedex.jpg",
  "dpd.jpg",
  "hermes.jpg",
  "IMG_3415.jpg",
  "inpost.jpg",
  "lufthansa.jpg",
  "mir.jpg",
  "nilex.jpg",
  "probal.jpg",
  "prymat.jpg",
  "rhenus.jpg",
  "rudolph.jpg",
  "schenker.jpg",
  "spar.jpg",
  "tymbark.jpg",
  "plane.jpg",
] as const;

const N = 1;

export default function Partners() {
  const [currentImage, setCurrentImage] = useState<number>(0); // index of a number

  useEffect(() => {
    let intv = setInterval(() => {
      const numOfImagesInRow = Math.trunc(
        (document.body.clientWidth * (2 / 3)) / (160 + 20)
      );

      if (
        currentImage + 1 > partners.length - numOfImagesInRow &&
        document.body.clientWidth > 800
      ) {
        setCurrentImage(0);
      } else {
        setCurrentImage((prev) => (prev + N >= partners.length ? 0 : prev + N));
      }
    }, 1000);

    return () => clearInterval(intv);
  }, [currentImage]);

  return (
    <div className="w-full lg:w-3/4 m-auto mt-16 overflow-hidden">
      <div
        // image-container
        className=" flex flex-row gap-5 transition-transform duration-200 linear"
        style={{
          transform: `translateX(${currentImage * (160 + 20) * -1}px)`,
          // transform: `translateX(${currentImage * (160 + 20) * -1}px)`,
        }}
      >
        {partners.map((partner) => (
          <div key={partner} className="w-40 h-40 flex-shrink-0 relative">
            <Image
              alt={partner}
              src={"/partners/logo/" + partner}
              fill
              className="select-none w-auto h-auto"
              sizes="160px"
              quality={75}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
