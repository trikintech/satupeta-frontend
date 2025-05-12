import React from "react";
import Image from "next/image";
import HighlightMapset from "./highlight-mapset";
import SearchInput from "./search-input";
import { appsName } from "@/shared/config/app-config";

export function HeroSection() {
  return (
    <div className="relative bg-white pt-30 pb-16">
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20 items-stretch">
          <div
            className="absolute inset-0 -top-10 -left-1.5 opacity-40 z-0 bg-[url('/pattern-01.png')]"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-8 justify-between">
            <div className="flex flex-col gap-10 xl:gap-20">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-gray-900 xl:leading-[70px]">
                Lihat Lebih Jauh, <br />
                <span className="text-primary">Pahami Lebih Dalam</span>
              </h1>
              <p className="text-zinc-700 max-w-[550px] text-xl">
                Portal geospasial resmi {appsName.wilayah} untuk akses data
                spasial yang akurat, terkini, dan mendukung pengambilan
                keputusan berbasis lokasi.
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
