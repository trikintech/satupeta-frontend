import { Suspense } from "react";
import MapSourcePageClient from "./page.client";
import PageHeader from "../_components/page-header";

export default function MapSourcePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Mapserver & Metadata" />
      <div className="px-6">
        <Suspense>
          <MapSourcePageClient />
        </Suspense>
      </div>
    </div>
  );
}
