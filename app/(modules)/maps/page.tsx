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
      <div className="pt-16 flex min-h-screen flex-col">
        <div className="flex flex-1">
          <div className="relative flex-1">
            <MapsPageClient />
          </div>
        </div>
      </div>
    </div>
  );
}
