import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import OrganizationCard from "./organization-card";

export function OrganizationSection() {
  // Dummy data for demonstration
  const organizations = [
    {
      name: "Dinas Komunikasi dan Informatika",
      link: "/statistik/mapset",
      totalDataset: 10,
    },
    {
      name: "Dinas Pertanian",
      link: "/statistik/mapset",
      totalDataset: 5,
    },
    {
      name: "Dinas Kesehatan",
      link: "/statistik/mapset",
      totalDataset: 8,
    },
    {
      name: "Dinas Komunikasi dan Informatika",
      link: "/statistik/mapset",
      totalDataset: 10,
    },
    {
      name: "Dinas Pertanian",
      link: "/statistik/mapset",
      totalDataset: 5,
    },
    {
      name: "Dinas Kesehatan",
      link: "/statistik/mapset",
      totalDataset: 8,
    },
  ];
  return (
    <section className="py-12 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-20">
          <div className="w-1/2">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-5xl text-slate-700">Daftar OPD</h2>
            </div>

            <p className="text-slate-500 text-xl mb-6 max-w-3xl">
              Total OPD menampilkan jumlah Organisasi Perangkat Daerah (OPD)
              yang terlibat dan berkontribusi dalam penyediaan data geospasial
              di platform Satu Peta
            </p>
            <Link
              href="/statistik/mapset"
              className="flex items-end text-primary text-sm font-medium hover:underline"
            >
              Lihat selengkapnya
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 mb-4">
            {organizations.map((org) => (
              <OrganizationCard
                name={org.name}
                totalDataset={org.totalDataset}
                link={org.link}
                key={org.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
