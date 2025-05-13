import { Suspense } from "react";
import PageHeader from "../../../_components/page-header";
import MapSourceEditPageClient from "./page.client";

export const metadata = {
  title: "Kategori",
};

export default function CategoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Ubah Mapserver & Metadata" />
      <div className="px-6">
        <Suspense fallback={<div>Memuat Data...</div>}>
          <MapSourceEditPageClient />
        </Suspense>
      </div>
    </div>
  );
}
