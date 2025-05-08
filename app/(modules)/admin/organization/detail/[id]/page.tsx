"use client";

import { useParams } from "next/navigation";
import OrganizationDetail from "../../_components/detail";
import PageHeader from "../../../_components/page-header";

export default function OrganizationDetailPage() {
  const params = useParams();

  return (
    <div className="container space-y-6">
      <PageHeader
        title="Detail Organization"
        description="Detail user di Satu Peta."
      />
      <OrganizationDetail id={params.id?.toString() ?? ""} />
    </div>
  );
}
