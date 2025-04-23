"use client";

import { useAuthSession } from "@/shared/hooks/use-session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminIndex = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthSession();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return null;
};

export default AdminIndex;
