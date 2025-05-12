import { Suspense } from "react";
import UserPageClient from "./page.client";
import PageHeader from "../_components/page-header";

export const metadata = {
  title: "Manajemen User",
};

export default function UserPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Manajemen User" />
      <div className="px-6">
        <Suspense>
          <Suspense fallback={<div>Memuat Data...</div>}>
            <UserPageClient />
          </Suspense>
        </Suspense>
      </div>
    </div>
  );
}
