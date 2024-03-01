"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

let initial = [
  "/home_tiles/Gastro.webp",
  "/home_tiles/Tiles.webp",
  "/home_tiles/Delivery.webp",

  "/home_tiles/Amazon.webp",
];

const logos = ["/1.png", "/3.png", "/4.png"];

export default function TilesSet() {
  const [images, setImages] = useState(initial);
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    let intv = setInterval(() => {
      let arr = [...initial];
      arr[iteration] = logos[iteration];

      setImages(arr);
      setIteration((i) => (i + 1 < logos.length ? i + 1 : 0));
    }, 3000);

    return () => clearInterval(intv);
  }, [iteration]);

  console.log(images);

  return (
    <section className="hidden lg:grid grid-cols-2 md:grid-cols-2 gap-2 justify-center px-5 mb-5 flex-1 lg:flex-[2] xl:flex-[2]">
      {images.map((src) => (
        <Image
          quality={"100"}
          width={300}
          height={288}
          key={src}
          src={src}
          alt="Work image"
          className="object-cover h-72 w-full"
        />
      ))}
    </section>
  );
}
