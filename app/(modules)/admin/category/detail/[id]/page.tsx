"use client";

import { useParams } from "next/navigation";
import CategoryDetail from "../../_components/detail";
import PageHeader from "../../../_components/page-header";

export default function CategoryDetailPage() {
  const params = useParams();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Detail Kategori"
        description="Detail kategori di Satu Peta."
        className="bg-zinc-50"
      />
      <CategoryDetail id={params.id?.toString() ?? ""} />
    </div>
  );
}
