import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ds/input";
import { Button } from "@/shared/components/ds/button";

export function HeroSection() {
  return (
    <div className="relative bg-white pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-gray-900 mb-4">
              Lihat Lebih Jauh, <br />
              <span className="text-primary">Pahami Lebih Dalam</span>
            </h1>
            <p className="text-gray-600 mb-8 max-w-lg">
              Satu Peta adalah platform terpadu untuk berbagai data spasial,
              sebagai solusi kebutuhan informasi geospasial bagi berbagai
              kepentingan nasional.
            </p>
            <div className="relative max-w-md mb-6">
              <Input
                type="text"
                placeholder="Masukkan kata kunci..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full"
              />
              <Button className="absolute right-0 top-0 rounded-l-none h-full bg-primary hover:bg-primary-hover">
                Cari
              </Button>
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/illustration-map.svg"
              alt="Satu Peta Illustration"
              width={580}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
