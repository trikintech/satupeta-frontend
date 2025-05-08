import { Suspense } from "react";
import UserPageClient from "./page.client";
import PageHeader from "../_components/page-header";

export default function UserPage() {
  return (
    <div className="container space-y-6">
      <PageHeader title="Manajemen User" />
      <Suspense>
        <UserPageClient />
      </Suspense>
    </div>
  );
}
