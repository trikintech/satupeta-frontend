import { Suspense } from "react";
import NewsPageClient from "./page.client";
import PageHeader from "../_components/page-header";

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Manajemen Konten" />
      <div className="px-6">
        <Suspense>
          <NewsPageClient />
        </Suspense>
      </div>
    </div>
  );
}
