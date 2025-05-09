"use client";

import { useParams } from "next/navigation";
import OrganizationDetail from "../../_components/detail";
import PageHeader from "../../../_components/page-header";

export default function OrganizationDetailPage() {
  const params = useParams();

  return (
    <div className="space-y-6">
      <PageHeader title="Detail Perangkat Daerah" className="bg-zinc-50" />
      <OrganizationDetail id={params.id?.toString() ?? ""} />
    </div>
  );
}
