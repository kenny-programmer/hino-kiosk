"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const bannerImages = [
  { src: "/images/banner-200.jpg", alt: "200 Series" },
  { src: "/images/banner-300.jpg", alt: "300 Series" },
  { src: "/images/banner-500.jpg", alt: "500 Series" },
  { src: "/images/banner-bus.jpg", alt: "Buses" },
  { src: "/images/banner-puv.jpg", alt: "PUVs" },
];

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-red-600">
      {/* Background banner with infinite scroll effect */}
      <div className="absolute inset-0 flex">
        <div className="flex min-w-full animate-banner">
          {[...bannerImages, ...bannerImages].map((image, index) => (
            <div key={index} className="relative min-w-full h-full">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
                className="opacity-30 blur-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <Image
            src="/images/hino-logo-white.png"
            alt="Hino Logo"
            width={300}
            height={120}
            className="mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Customize Your Hino Truck
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Explore our range of trucks and find the perfect solution for your
            business needs
          </p>
        </div>

        <Link href="/products">
          <Button className="bg-white hover:bg-gray-100 text-red-600 px-8 py-6 text-xl rounded-md font-bold">
            Customize Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
