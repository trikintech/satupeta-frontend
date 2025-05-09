import { Suspense } from "react";
import PageHeader from "../../_components/page-header";
import AddMapsPageClient from "./page.client";

export default function AddMapsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tambah Mapset dan Metadata"
        description="Tambah mapset dan metadata untuk memperbarui data geospasial di Satu Peta."
      />
      <Suspense>
        <Suspense fallback={<div>Memuat form...</div>}>
          <AddMapsPageClient />
        </Suspense>
      </Suspense>
    </div>
  );
}
