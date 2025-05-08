"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsCard from "./news-card";

export function NewsSection() {
  const news = [
    {
      title:
        "Pemutakhiran Mapset: Satu Peta Tambahkan 50 Dataset Baru di Kuartal Pertama 2025",
      description: "Berita terbaru tentang pemutakhiran mapset",
      date: "2025-01-01",
      link: "/statistik/mapset",
      image: "/template-news.png",
    },
    {
      title:
        "Pemutakhiran Mapset: Satu Peta Tambahkan 50 Dataset Baru di Kuartal Pertama 2025",
      description: "Berita terbaru tentang pemutakhiran mapset",
      date: "2025-01-01",
      link: "/statistik/mapset",
      image: "/template-news.png",
    },
    {
      title:
        "Pemutakhiran Mapset: Satu Peta Tambahkan 50 Dataset Baru di Kuartal Pertama 2025",
      description: "Berita terbaru tentang pemutakhiran mapset",
      date: "2025-01-01",
      link: "/statistik/mapset",
      image: "/template-news.png",
    },
  ];
  return (
    <section className="py-10" id="news">
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

          <div className="grid grid-cols-1 md:grid-cols-3 mb-4 ">
            {news.map((item, index) => (
              <NewsCard
                key={index}
                title={item.title}
                description={item.description}
                date={item.date}
                link={item.link}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
