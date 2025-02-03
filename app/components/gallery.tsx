"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const images = [
  // skydiving
  "/images/gallery/skydiving/IMG_2322.jpg",
  "/images/gallery/skydiving/IMG_3429.jpg",
  "/images/gallery/skydiving/IMG_4072.jpg",
  "/images/gallery/skydiving/IMG_2363.jpg",

  // off roading
  "/images/gallery/overlanding/IMG_3426.jpg",
  "/images/gallery/overlanding/IMG_4208.jpg",
  "/images/gallery/overlanding/IMG_4455.jpg",
  "/images/gallery/overlanding/IMG_4088.jpg",

  // general
  "/images/gallery/general/IMG_2878.jpg",
];

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scroll = () => {
      if (isHovering) return;
      scrollContainer.scrollLeft += 1;
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering]);

  return (
    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-slate-200 border-neutral-accent/30 transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-neutral-accent/50 hover:shadow-xl dark:border-slate-800">
      <h2 className="text-3xl font-bold mb-6 text-neutral-heading">Gallery</h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden space-x-4 py-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 relative w-72 h-48 transition-all duration-300 ease-in-out hover:scale-105"
          >
            <Image
              src={src || "/images/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
