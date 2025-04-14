import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function StatisticsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Statistik Konten
        </h2>

        <p className="text-gray-600 mb-8 max-w-3xl">
          Statistik Konten menampilkan jumlah total mapset dan metadata yang
          tersedia di dalam platform Satu Peta, memberikan gambaran tentang
          mengapa capaian dan ketersediaan data geospasial yang terpublikasi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="bg-primary-light p-6 rounded-lg">
            <h3 className="text-5xl font-bold text-primary mb-2">303</h3>
            <p className="text-gray-700 mb-4">Mapset</p>
            <Link
              href="/statistik/mapset"
              className="flex items-center text-primary text-sm font-medium hover:underline"
            >
              Lihat selengkapnya
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="bg-background-dark p-6 rounded-lg">
            <h3 className="text-5xl font-bold text-white mb-2">115</h3>
            <p className="text-gray-300 mb-4">Metadata</p>
            <Link
              href="/statistik/metadata"
              className="flex items-center text-white text-sm font-medium hover:underline"
            >
              Lihat selengkapnya
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
