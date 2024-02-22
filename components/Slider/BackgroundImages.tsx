"use client";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

const INTERVAL = 3500;

export default function BackgroundImages({
  images,
}: {
  images: StaticImageData[];
}) {
  const [currentImage, setCurrentImage] = useState<number>(0); // index of a number

  useEffect(() => {
    let intv = setInterval(() => {
      setCurrentImage((prev) => (prev + 1 >= images.length ? 0 : prev + 1));
    }, INTERVAL);

    return () => clearInterval(intv);
  }, []);

  return (
    <div
      className={`absolute top-0 left-0 flex transition ease-out duration-500`}
      style={{
        transform: `translateX(-${currentImage * 100}vw)`,
      }}
    >
      {images.map((image, index) => (
        <div className="w-screen h-screen relative" key={index}>
          <img
            fetchPriority={index === 0 || index === 1 ? "high" : "low"}
            src={image.src}
            alt="Background image"
            className="w-screen h-screen object-cover"
          />
        </div>
      ))}
    </div>
  );
}
