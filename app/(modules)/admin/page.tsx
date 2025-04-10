"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminIndex = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/admin/dashboard");
    }

    console.log(session);
  }, [session, router]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return null;
};

export default AdminIndex;
