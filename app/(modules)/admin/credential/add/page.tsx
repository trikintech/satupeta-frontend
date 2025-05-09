import { Suspense } from "react";
import AddCredentialPageClient from "./page.client";
import PageHeader from "../../_components/page-header";

export default function AddCredentialPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tambah Kredensial" className="bg-zinc-50" />
      <div className="px-6">
        <Suspense fallback={<div>Memuat form...</div>}>
          <AddCredentialPageClient />
        </Suspense>
      </div>
    </div>
  );
}
