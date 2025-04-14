"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MainMapsetCard } from "./main-mapset-card";
import { MapsetCard } from "../mapset-card";
import { mapsets } from "@/shared/utils/mapsets";

export function CatalogSection() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          <div className="w-1/2">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-5xl text-slate-700">Katalog Mapset</h2>
            </div>

            <p className="text-slate-500 text-xl mb-6 max-w-3xl">
              Menampilkan berbagai informasi peta tematik melalui fitur map
              exploration, choropleth map, layering map, dan detail mapset, yang
              memudahkan pengguna dalam menjelajahi dan memahami data geospasial
              secara interaktif.
            </p>

            <Link
              href="/katalog"
              className="flex items-center text-primary text-sm font-medium hover:underline"
            >
              Lihat selengkapnya
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <MainMapsetCard mapset={mapsets[0]} key={mapsets[0].id} />
            </div>

            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {mapsets.slice(1, 5).map((mapset) => (
                <MapsetCard key={mapset.id} mapset={mapset} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
