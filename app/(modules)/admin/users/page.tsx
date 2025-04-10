"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.replace("/admin/login");
    return null;
  }

  return <div>Tes Users</div>;
};

export default DashboardPage;
