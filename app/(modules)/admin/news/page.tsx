import { Suspense } from "react";
import NewsPageClient from "./page.client";
import PageHeader from "../_components/page-header";

export default function NewsPage() {
  return (
    <div className="container space-y-6">
      <PageHeader title="Manajemen Konten" />
      <Suspense>
        <NewsPageClient />
      </Suspense>
    </div>
  );
}
