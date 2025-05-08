"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import OrganizationCard from "./organization-card";
import { useQuery } from "@tanstack/react-query";
import organizationApi from "@/shared/services/organization";

export function OrganizationSection() {
  const { data: organizations, isLoading } = useQuery({
    queryKey: ["organizations-list"],
    queryFn: () =>
      organizationApi
        .getOrganizations({
          limit: 5,
        })
        .then((res) => {
          return res.items;
        }),
    staleTime: 5000,
  });

  return (
    <section className="py-12 bg-white" id="organization">
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

          {(() => {
            if (isLoading) {
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 mb-4 gap-4">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse bg-gray-100 rounded-lg p-6 h-32"
                    ></div>
                  ))}
                </div>
              );
            }

            if (!organizations || organizations.length === 0) {
              return (
                <div className="flex justify-center items-center h-32 text-gray-500">
                  Tidak ada data organisasi
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-3 mb-4 gap-4">
                {organizations.map((org) => (
                  <OrganizationCard
                    name={org.name}
                    totalDataset={org.count_mapset}
                    link={`/maps?open-catalog=true&query=${org.name}&tab=organization`}
                    key={org.id}
                  />
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
