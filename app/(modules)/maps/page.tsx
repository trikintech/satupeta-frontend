import { Metadata } from "next";
import { Header } from "@/shared/components/layout/header";
import MapsPageClient from "./page.client";
import { appsName } from "@/shared/config/app-config";

export const metadata: Metadata = {
  title: `${appsName.name} ${appsName.wilayah}`,
  description: `Portal geospasial resmi ${appsName.wilayah} untuk akses data spasial yang akurat, terkini, dan mendukung pengambilan keputusan berbasis lokasi.`,
};

export default function Maps() {
  return (
    <div className="h-screen overflow-hidden">
      <Header />

      <MapsPageClient />
    </div>
  );
}
