import { Metadata } from "next";
import MapsPageClient from "./page.client";
import { appConfig } from "@/shared/config/app-config";

export const metadata: Metadata = {
  title: `${appConfig.name} ${appConfig.wilayah}`,
  description: `Portal geospasial resmi ${appConfig.wilayah} untuk akses data spasial yang akurat, terkini, dan mendukung pengambilan keputusan berbasis lokasi.`,
};

export default function Maps() {
  return <MapsPageClient />;
}
