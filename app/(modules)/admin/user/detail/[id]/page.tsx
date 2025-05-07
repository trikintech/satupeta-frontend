"use client";

import { useParams } from "next/navigation";
import UserDetail from "../../components/detail";

export default function UserDetailPage() {
  const params = useParams();

  return (
    <div className="container mx-auto p-4">
      <UserDetail id={params.id?.toString() ?? ""} />
    </div>
  );
}
