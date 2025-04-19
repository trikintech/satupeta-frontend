import React from "react";
import Image from "next/image";
import HighlightMapset from "./highlight-mapset";
import SearchInput from "./search-input";

export function HeroSection() {
  return (
    <div className="relative bg-white pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-stretch">
          <div className="flex flex-col gap-8 justify-between">
            <div className="flex flex-col gap-8">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-gray-900 xl:leading-[70px]">
                Lihat Lebih Jauh, <br />
                <span className="text-primary">Pahami Lebih Dalam</span>
              </h1>
              <p className="text-gray-600 max-w-[550px] text-xl">
                Portal geospasial resmi Jawa Timur untuk akses data spasial yang
                akurat, terkini, dan mendukung pengambilan keputusan berbasis
                lokasi.
              </p>
            </div>
            <SearchInput />
          </div>
          <div className="hidden md:flex items-stretch">
            <div className="w-full h-full relative">
              <Image
                src="/illustration-map.png"
                alt="Satu Peta Illustration"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        <HighlightMapset />
      </div>
    </div>
  );
}
