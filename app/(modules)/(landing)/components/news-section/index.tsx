"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsCard from "./news-card";
import { useQuery } from "@tanstack/react-query";
import newsApi from "@/shared/services/news";

export function NewsSection() {
  const { data: news, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: () =>
      newsApi
        .getNewsList({
          limit: 5,
          filter: ["is_active=true"],
        })
        .then((res) => res.items),
    staleTime: 5000,
  });

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
              href="/news"
              className="flex items-center text-primary text-sm font-medium hover:underline"
            >
              Lihat selengkapnya
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-slate-200 h-72 rounded-xl"
                  />
                ))
              : news &&
                news.map((item) => (
                  <NewsCard
                    key={item.id}
                    title={item.name}
                    description={item.description}
                    link={`/news/${item.id}`}
                    image={item.thumbnail}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
