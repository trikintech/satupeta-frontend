import { Suspense } from "react";
import OrganizationPageClient from "./page.client";
import PageHeader from "../_components/page-header";

export default function OrganizationPage() {
  return (
    <div className="container space-y-6">
      <PageHeader title="Manajemen Perangkat Daerah" />
      <Suspense>
        <OrganizationPageClient />
      </Suspense>
    </div>
  );
}
