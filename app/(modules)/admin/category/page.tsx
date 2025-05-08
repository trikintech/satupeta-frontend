import { Suspense } from "react";
import CategoryPageClient from "./page.client";
import PageHeader from "../_components/page-header";

export const metadata = {
  title: "Kategori",
};

export default function CategoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Kategori" />
      <div className="px-6">
        <Suspense>
          <Suspense fallback={<div>Memuat Data...</div>}>
            <CategoryPageClient />
          </Suspense>
        </Suspense>
      </div>
    </div>
  );
}
