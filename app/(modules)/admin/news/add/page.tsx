import { Suspense } from "react";
import AddNewsPageClient from "./page.client";
import PageHeader from "../../_components/page-header";

export default function AddNewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tambah Konten" className="bg-zinc-50" />
      <div className="px-6">
        <Suspense fallback={<div>Memuat form...</div>}>
          <AddNewsPageClient />
        </Suspense>
      </div>
    </div>
  );
}
