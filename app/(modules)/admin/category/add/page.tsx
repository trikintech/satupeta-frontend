import { Suspense } from "react";
import AddCategoryPageClient from "./page.client";
import PageHeader from "../../_components/page-header";

export default function AddCategoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tambah Kategori"
        description="Tambah kategori baru di Satu Peta."
      />
      <div className="px-6">
        <div className="max-w-xl">
          <Suspense fallback={<div>Memuat form...</div>}>
            <AddCategoryPageClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
