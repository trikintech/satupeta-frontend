import { Suspense } from "react";
import PageHeader from "../../../_components/page-header";
import OrganizationEditPageClient from "./page.client";

export const metadata = {
  title: "Kategori",
};

export default function CategoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Ubah Perangkat Daerah" />
      <div className="px-6">
        <Suspense fallback={<div>Memuat Data...</div>}>
          <OrganizationEditPageClient />
        </Suspense>
      </div>
    </div>
  );
}
