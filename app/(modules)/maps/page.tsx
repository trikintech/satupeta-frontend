import { Metadata } from "next";
import { Header } from "@/shared/components/layout/header";
import MapsPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Maps Portal",
  description: "Portal to view and analyze data geospatial",
};

export default function Maps() {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="pt-16 flex h-full flex-col">
        <div className="flex flex-1 overflow-hidden">
          <div className="relative flex-1 overflow-hidden">
            <MapsPageClient />
          </div>
        </div>
      </div>
    </div>
  );
}
