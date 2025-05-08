"use client";

import { useParams } from "next/navigation";
import NewsDetail from "../../_components/detail";
import PageHeader from "../../../_components/page-header";

export default function NewsDetailPage() {
  const params = useParams();

  return (
    <div className="container space-y-6">
      <PageHeader
        title="Detail Berita"
        description="Detail konten di Satu Peta."
      />
      <NewsDetail id={params.id?.toString() ?? ""} />
    </div>
  );
}
