import { Suspense } from "react";
import CredentialPageClient from "./page.client";
import PageHeader from "../_components/page-header";

export const metadata = {
  title: "Kredensial",
};

export default function CredentialPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Kredensial" />
      <div className="px-6">
        <Suspense>
          <Suspense fallback={<div>Memuat Data...</div>}>
            <CredentialPageClient />
          </Suspense>
        </Suspense>
      </div>
    </div>
  );
}
