"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface CarouselImage {
  src: string;
  alt: string;
  header: string;
  description: string;
}

export default function Description({
  images = [],
}: {
  images: CarouselImage[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [images.length, isHovered]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
      <div
        className="relative aspect-[3/2] w-full md:w-1/2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className={`absolute left-0 top-0 transition-transform duration-500 ease-in-out ${
                index === currentIndex
                  ? "translate-x-0"
                  : index === (currentIndex - 1 + images.length) % images.length
                    ? "-translate-x-full"
                    : "translate-x-full"
              }`}
            />
          ))}
        </div>
        <div
          className={`text-whitetransition-all absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded bg-black bg-opacity-50 p-4 duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <h3 className="truncate text-lg font-bold">
            {images[currentIndex]!.header}
          </h3>
          <p className="line-clamp-2 text-sm">
            {images[currentIndex]!.description}
          </p>
        </div>
        <button
          onClick={goToPrevious}
          className={`duration absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      {/* Text Content */}
      <div className="space-y-4 md:w-1/2">
        <p>
          At Dublin High Speech and Debate, we develop our public speaking,
          teamwork, research, and critical thinking skills with the opportunity
          to represent Dublin High at competitive national tournaments every 2-6
          weeks. Speech and Debate not only foster skills that are applicable to
          every career path, but also open up avenues for growth and achievement
          for anyone up to the challenge.
        </p>
        <p>
          Our community of 100+ members includes a wide range of skill levels -
          from new novices to nationally-ranked veterans; all are welcome.
        </p>
      </div>
    </div>
  );
}
