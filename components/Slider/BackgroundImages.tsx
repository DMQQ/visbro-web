"use client";
import { useEffect, useState } from "react";

const INTERVAL = 3500;

export default function BackgroundImages({
  images,
}: {
  images: { image: string; srcset: string }[];
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
      {images.map((images, index) => (
        <div className="w-screen h-screen relative" key={index}>
          <img
            fetchPriority={index === 0 ? "high" : "low"}
            src={images.image}
            srcSet={images.srcset}
            alt="Background image"
            // loading={index === 0 || index === 1 ? "eager" : "lazy"}
            className="w-screen h-screen object-cover"
            sizes="
            (max-width: 450px) 100vw,   
            (max-width: 800px) 100vw,   
            100vw
            "
          />
        </div>
      ))}
    </div>
  );
}
