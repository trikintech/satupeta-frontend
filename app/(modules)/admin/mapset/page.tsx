import { Suspense } from "react";
import MapsPageClient from "./page.client";
import PageHeader from "./components/page-header";

export default function MapsPage() {
  return (
    <div className="container space-y-6">
      <PageHeader title="Manajemen Peta" />
      <Suspense>
        <MapsPageClient />
      </Suspense>
    </div>
  );
}
