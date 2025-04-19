import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function OrganizationSection() {
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

          <div className="grid grid-cols-1 md:grid-cols-4 mb-4">
            <div className="border border-[#94A3B8] p-4">
              <div className="flex flex-col gap-4 mb-24">
                <p className="text-slate-600 mb-4 text-2xl">Nama OPD</p>
              </div>
              <div className="flex items-end">
                <Image
                  src={"/template-organization.png"}
                  alt="Organization"
                  width={50}
                  height={50}
                  className="w-8 h-8 object-cover"
                />
                <Link
                  href="/statistik/mapset"
                  className="ml-auto text-primary text-sm font-medium hover:underline"
                >
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>{" "}
            <div className="border border-[#94A3B8] p-4">
              <div className="flex flex-col gap-4 mb-24">
                <p className="text-slate-600 mb-4 text-2xl">Nama OPD</p>
              </div>
              <div className="flex items-end">
                <Image
                  src={"/template-organization.png"}
                  alt="Organization"
                  width={50}
                  height={50}
                  className="w-8 h-8 object-cover"
                />
                <Link
                  href="/statistik/mapset"
                  className="ml-auto text-primary text-sm font-medium hover:underline"
                >
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>{" "}
            <div className="border border-[#94A3B8] p-4">
              <div className="flex flex-col gap-4 mb-24">
                <p className="text-slate-600 mb-4 text-2xl">Nama OPD</p>
              </div>
              <div className="flex items-end">
                <Image
                  src={"/template-organization.png"}
                  alt="Organization"
                  width={50}
                  height={50}
                  className="w-8 h-8 object-cover"
                />
                <Link
                  href="/statistik/mapset"
                  className="ml-auto text-primary text-sm font-medium hover:underline"
                >
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>{" "}
            <div className="border border-[#94A3B8] p-4">
              <div className="flex flex-col gap-4 mb-24">
                <p className="text-slate-600 mb-4 text-2xl">Nama OPD</p>
              </div>
              <div className="flex items-end">
                <Image
                  src={"/template-organization.png"}
                  alt="Organization"
                  width={50}
                  height={50}
                  className="w-8 h-8 object-cover"
                />
                <Link
                  href="/statistik/mapset"
                  className="ml-auto text-primary text-sm font-medium hover:underline"
                >
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>{" "}
            <div className="border border-[#94A3B8] p-4">
              <div className="flex flex-col gap-4 mb-24">
                <p className="text-slate-600 mb-4 text-2xl">Nama OPD</p>
              </div>
              <div className="flex items-end">
                <Image
                  src={"/template-organization.png"}
                  alt="Organization"
                  width={50}
                  height={50}
                  className="w-8 h-8 object-cover"
                />
                <Link
                  href="/statistik/mapset"
                  className="ml-auto text-primary text-sm font-medium hover:underline"
                >
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>{" "}
            <div className="border border-[#94A3B8] p-4">
              <div className="flex flex-col gap-4 mb-24">
                <p className="text-slate-600 mb-4 text-2xl">Nama OPD</p>
              </div>
              <div className="flex items-end">
                <Image
                  src={"/template-organization.png"}
                  alt="Organization"
                  width={50}
                  height={50}
                  className="w-8 h-8 object-cover"
                />
                <Link
                  href="/statistik/mapset"
                  className="ml-auto text-primary text-sm font-medium hover:underline"
                >
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>{" "}
            <div className="border border-[#94A3B8] p-4">
              <div className="flex flex-col gap-4 mb-24">
                <p className="text-slate-600 mb-4 text-2xl">Nama OPD</p>
              </div>
              <div className="flex items-end">
                <Image
                  src={"/template-organization.png"}
                  alt="Organization"
                  width={50}
                  height={50}
                  className="w-8 h-8 object-cover"
                />
                <Link
                  href="/statistik/mapset"
                  className="ml-auto text-primary text-sm font-medium hover:underline"
                >
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>{" "}
            <div className="border border-[#94A3B8] p-4">
              <div className="flex flex-col gap-4 mb-24">
                <p className="text-slate-600 mb-4 text-2xl">Nama OPD</p>
              </div>
              <div className="flex items-end">
                <Image
                  src={"/template-organization.png"}
                  alt="Organization"
                  width={50}
                  height={50}
                  className="w-8 h-8 object-cover"
                />
                <Link
                  href="/statistik/mapset"
                  className="ml-auto text-primary text-sm font-medium hover:underline"
                >
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
