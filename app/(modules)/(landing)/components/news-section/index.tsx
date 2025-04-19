"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function NewsSection() {
  return (
    <section className="py-10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-20">
          <div className="w-1/2">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-5xl text-slate-700">Berita dan Pengumuman</h2>
            </div>

            <p className="text-slate-500 text-xl mb-6 max-w-3xl">
              Berisi informasi terbaru, berita kegiatan, serta pengumuman resmi
              terkait pengelolaan dan pengembangan data geospasial di platform
              Satu Peta
            </p>

            <Link
              href="/katalog"
              className="flex items-center text-primary text-sm font-medium hover:underline"
            >
              Lihat selengkapnya
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mb-4 ">
            <div className="grid grid-cols-2 gap-4 p-4 border border-[#94A3B8]">
              <Image
                src={"/template-news.png"}
                alt="news"
                width={379}
                height={379}
              />
              <div className="relative flex flex-col gap-4">
                <div className="text-slate-500 text-xl">category</div>
                <div className="text-slate-600 leading-9 text-3xl">
                  Pemutakhiran Mapset: Satu Peta Tambahkan 50 Dataset Baru di
                  Kuartal Pertama 2025
                </div>

                <Link
                  href="/statistik/mapset"
                  className="absolute left-0 bottom-0 text-primary flex items-center text-sm font-medium hover:underline"
                >
                  Lihat selengkapnya
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 border border-[#94A3B8]">
              <Image
                src={"/template-news-2.png"}
                alt="news"
                width={379}
                height={379}
              />
              <div className="relative flex flex-col gap-4">
                <div className="text-slate-500 text-xl">category</div>
                <div className="text-slate-600 leading-9 text-3xl">
                  Satu Peta Percepat Integrasi Data Geospasial Antar OPD di
                  Daerah
                </div>

                <Link
                  href="/statistik/mapset"
                  className="absolute left-0 bottom-0 text-primary flex items-center text-sm font-medium hover:underline"
                >
                  Lihat selengkapnya
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
