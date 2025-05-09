import { Suspense } from "react";
import CategoryPageClient from "../../../category/edit/[id]/page.client";
import PageHeader from "../../../_components/page-header";

export const metadata = {
  title: "Kategori",
};

export default function CategoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Ubah Perangkat Daerah" />
      <div className="px-6">
        <Suspense fallback={<div>Memuat Data...</div>}>
          <CategoryPageClient />
        </Suspense>
      </div>
    </div>
  );
}
