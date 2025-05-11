import { Suspense } from "react";
import AddUserPageClient from "./page.client";
import PageHeader from "../../_components/page-header";

export default function AddUserPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tambah User" className="bg-zinc-50" />
      <div className="px-6">
        <Suspense fallback={<div>Memuat form...</div>}>
          <AddUserPageClient />
        </Suspense>
      </div>
    </div>
  );
}
