"use client";

import { useParams } from "next/navigation";
import UserDetail from "../../_components/detail";
import PageHeader from "../../../_components/page-header";

export default function UserDetailPage() {
  const params = useParams();

  return (
    <div className="space-y-6">
      <PageHeader title="Detail User" className="bg-zinc-50" />
      <UserDetail id={params.id?.toString() ?? ""} />
    </div>
  );
}
