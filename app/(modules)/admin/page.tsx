"use client";

import { useAuthSession } from "@/shared/hooks/use-session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { roles } from "@/shared/config/role";

const AdminIndex = () => {
  const router = useRouter();
  const { isAuthenticated, session } = useAuthSession();

  useEffect(() => {
    if (isAuthenticated && session?.user?.role) {
      const userRole = session.user.role;
      if (roles[userRole.name]) {
        const redirectPath = roles[userRole.name].redirectTo;
        router.replace(redirectPath);
      }
    }
  }, [isAuthenticated, session, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return null;
};

export default AdminIndex;
