import { Suspense } from "react";
import PageHeader from "../../_components/page-header";
import AddMapsPageClient from "./page.client";

export default function AddMapsPage() {
  return (
    <div className="container space-y-6">
      <PageHeader title="Tambah User" description="Tambah user di Satu Peta." />
      <Suspense>
        <Suspense fallback={<div>Memuat form...</div>}>
          <AddMapsPageClient />
        </Suspense>
      </Suspense>
    </div>
  );
}
