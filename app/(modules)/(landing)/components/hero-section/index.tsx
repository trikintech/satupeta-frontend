import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ds/input";
import { Button } from "@/shared/components/ds/button";
import HighlightMapset from "./highlight-mapset";

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
                Portal geospasial resmi __PROVINCE__ untuk akses data spasial
                yang akurat, terkini, dan mendukung pengambilan keputusan
                berbasis lokasi.
              </p>
            </div>
            <div className="relative max-w-xl h-[52px]">
              <Input
                type="text"
                placeholder="Masukkan kata kunci..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full h-[52px]"
              />
              <Button className="absolute right-2 top-2 bottom-2 h-9 bg-primary hover:bg-primary-hover">
                Search
              </Button>
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
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
