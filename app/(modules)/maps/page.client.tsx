"use client";
import MapComponent from "./components/map-component";
import MapsetDialog from "./components/mapset-dialog";
import FeatureInformation from "./components/feature-information";
import Sidebar from "./components/sidebar";
import { Suspense } from "react";
import { QueryParamProvider } from "use-query-params";
import NextAdapterApp from "next-query-params/app";
import { Header } from "@/shared/components/layout/header";

export default function MapsPageClient() {
  return (
    <Suspense>
      <QueryParamProvider adapter={NextAdapterApp}>
        <div className="h-screen pt-16 flex flex-col">
          <Header />
          <div className="flex-1 relative overflow-hidden">
            <Sidebar />
            <MapComponent />
            <MapsetDialog />
            <FeatureInformation />
          </div>
        </div>
      </QueryParamProvider>
    </Suspense>
  );
}
