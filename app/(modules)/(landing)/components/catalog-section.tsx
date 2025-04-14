import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MapCard } from "./map-card";

const mapsets = [
  {
    id: 1,
    title: "Peta Dasar permukaan untuk perencanaan di Jawa Timur",
    image: "/maps/map-1.jpg",
    tag: "Peta Dasar",
    href: "/katalog/1",
  },
  {
    id: 2,
    title: "Mengenal Peta Tematik Jawa Timur dan Tata Ruang Hingga Mikro",
    image: "/maps/map-2.jpg",
    tag: "Peta Tematik",
    href: "/katalog/2",
  },
  {
    id: 3,
    title: "Geospasial untuk Sebaran Jenis Data Komoditas Mudah di Jawa Timur",
    image: "/maps/map-3.jpg",
    tag: "Geospasial",
    href: "/katalog/3",
  },
  {
    id: 4,
    title: "Mengenal Peta Tematik Jawa Timur Dari Titik Observasi",
    image: "/maps/map-4.jpg",
    tag: "Peta Tematik",
    href: "/katalog/4",
  },
];

export function CatalogSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Katalog Mapset</h2>
          <Link
            href="/katalog"
            className="flex items-center text-primary text-sm font-medium hover:underline"
          >
            Lihat selengkapnya
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <p className="text-gray-600 mb-8 max-w-3xl">
          Menampilkan berbagai informasi peta tematik, minimal fitur map,
          geospasial yang lengkap, dan berbagai data spasial lainnya, yang
          memfasilitasi pengguna dalam memahami dan memanfaatkan data geospasial
          secara efisien.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mapsets.map((item) => (
            <MapCard
              key={item.id}
              href={item.href}
              image={item.image}
              tag={item.tag}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
