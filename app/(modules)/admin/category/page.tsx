import { Suspense } from "react";
import PageHeader from "../_components/page-header";
import CategoryPageClient from "./page.client";

export const metadata = {
  title: "Kategori",
};

export default function CategoryPage() {
  return (
    <div className="container space-y-6">
      <PageHeader title="Kategori" />
      <Suspense>
        <CategoryPageClient />
      </Suspense>
    </div>
  );
}
