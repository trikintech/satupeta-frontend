import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function StatisticsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-20">
          <div className="w-1/2">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-5xl text-slate-700">Statistik Konten</h2>
            </div>

            <p className="text-slate-500 text-xl mb-6 max-w-3xl">
              Statistik Konten menampilkan jumlah total mapset dan metadata yang
              tersedia di dalam platform Satu Peta, memberikan gambaran terkini
              mengenai cakupan dan kelengkapan data geospasial yang terpublikasi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mb-4 border border-[#94A3B8]">
            <div className="bg-primary-light p-4">
              <div className="flex flex-col gap-4 mb-24">
                <h3 className="text-8xl font-bold text-primary mb-2">303</h3>
                <p className="text-slate-600 mb-4 text-2xl">Mapset</p>
              </div>
              <Link
                href="/statistik/mapset"
                className="flex items-center text-primary text-sm font-medium hover:underline"
              >
                Lihat selengkapnya
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="bg-sky-950 p-4 text-slate-50">
              <div className="flex flex-col gap-4 mb-24">
                <h3 className="text-8xl font-bold mb-2">115</h3>
                <p className="mb-4 text-2xl">Metadata</p>
              </div>
              <Link
                href="/statistik/mapset"
                className="flex items-center text-sm font-medium hover:underline"
              >
                Lihat selengkapnya
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
