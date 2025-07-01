import { Suspense } from "react";
import AddOrganizationPageClient from "./page.client";
import PageHeader from "../../_components/page-header";

export default function AddOrganizationPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tambah Perangkat Daerah" className="bg-zinc-50" />
      <div className="px-6">
        <Suspense fallback={<div>Memuat form...</div>}>
          <AddOrganizationPageClient />
        </Suspense>
      </div>
    </div>
  );
}
