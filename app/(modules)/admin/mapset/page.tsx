import { Suspense } from "react";
import MapsPageClient from "./page.client";
import PageHeader from "../_components/page-header";

export default function MapsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Manajemen Peta" />
      <div className="px-6">
        <Suspense>
          <MapsPageClient />
        </Suspense>
      </div>
    </div>
  );
}
