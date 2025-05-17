"use client";
import MapComponent from "./components/map-component";
import MapsetDialog from "./components/mapset-dialog";
import FeatureInformation from "./components/feature-information";
import Sidebar from "./components/sidebar";
import { Suspense } from "react";
import { QueryParamProvider } from "use-query-params";
import NextAdapterApp from "next-query-params/app";

export default function MapsPageClient() {
  return (
    <Suspense>
      <QueryParamProvider adapter={NextAdapterApp}>
        <div className="pt-16 flex h-screen flex-col">
          <div className="relative flex-1">
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
