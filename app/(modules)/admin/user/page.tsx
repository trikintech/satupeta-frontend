import { Suspense } from "react";
import UserPageClient from "./page.client";
import PageHeader from "../_components/page-header";

export default function UserPage() {
  return (
    <div className=" space-y-6">
      <PageHeader title="Manajemen User" />
      <div className="px-6">
        <Suspense>
          <UserPageClient />
        </Suspense>
      </div>
    </div>
  );
}
