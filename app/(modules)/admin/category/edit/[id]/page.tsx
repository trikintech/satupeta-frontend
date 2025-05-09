import { Suspense } from "react";
import CategoryEditPageClient from "./page.client";
import PageHeader from "../../../_components/page-header";

export const metadata = {
  title: "Edit Kategori",
};

export default function CategoryEditPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Ubah Kategori" className="bg-zinc-50" />
      <div className="px-6">
        <Suspense fallback={<div>Memuat form...</div>}>
          <CategoryEditPageClient />
        </Suspense>
      </div>
    </div>
  );
}
