"use client";

import { useParams } from "next/navigation";
import UserDetail from "../../components/detail";
import PageHeader from "../../../components/page-header";

export default function UserDetailPage() {
  const params = useParams();

  return (
    <div className="container space-y-6">
      <PageHeader title="Detail User" description="Detail user di Satu Peta." />
      <UserDetail id={params.id?.toString() ?? ""} />
    </div>
  );
}
