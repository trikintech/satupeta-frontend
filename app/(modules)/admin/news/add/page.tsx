import { Suspense } from "react";
import PageHeader from "../../_components/page-header";
import AddNewsPageClient from "./page.client";

export default function AddNewsPage() {
  return (
    <div className="container space-y-6">
      <PageHeader
        title="Tambah Berita"
        description="Tambah berita di Satu Peta."
      />
      <Suspense>
        <Suspense fallback={<div>Memuat form...</div>}>
          <AddNewsPageClient />
        </Suspense>
      </Suspense>
    </div>
  );
}
