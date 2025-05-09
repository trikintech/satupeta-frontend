import { Suspense } from "react";
import CredentialEditPageClient from "./page.client";
import PageHeader from "../../../_components/page-header";

export const metadata = {
  title: "Edit Kredensial",
};

export default function CredentialEditPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Ubah Kredensial" className="bg-zinc-50" />
      <div className="px-6">
        <Suspense fallback={<div>Memuat form...</div>}>
          <CredentialEditPageClient />
        </Suspense>
      </div>
    </div>
  );
}
