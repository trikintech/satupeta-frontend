import { Metadata } from "next";
import MapsPageClient from "./page.client";
import { appsName } from "@/shared/config/app-config";

export const metadata: Metadata = {
  title: `${appsName.name} ${appsName.wilayah}`,
  description: `Portal geospasial resmi ${appsName.wilayah} untuk akses data spasial yang akurat, terkini, dan mendukung pengambilan keputusan berbasis lokasi.`,
};

export default function Maps() {
  return <MapsPageClient />;
}
