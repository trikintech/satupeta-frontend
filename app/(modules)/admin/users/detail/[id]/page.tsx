"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ds/button";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import userApi from "@/shared/services/user";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", params.id],
    queryFn: () =>
      userApi.getUserById(+(params?.id ?? 0)).then((res) => res.data),
    enabled: !!params.id,
  });

  if (isLoading) {
    return <div>Loading user details...</div>;
  }

  if (isError || !userData) {
    return <div>Failed to load user details. Please try again later.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
      <Card className="w-full">
        <CardContent>
          <div className="space-y-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold">Username</h2>
              <p>{userData.username}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Name</h2>
              <p>{userData.name}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Email</h2>
              <p>{userData.email}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Role</h2>
              <p>{userData.role.name}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Jabatan</h2>
              <p>{userData.position || "N/A"}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">NIP</h2>
              <p>{userData.employee_id || "N/A"}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Status</h2>
              <p>{userData.is_active ? "Active" : "Inactive"}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              variant="primary"
              onClick={() => router.push(`/admin/users/update/${params.id}`)}
            >
              Edit User
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/admin/users")}
            >
              Back to Users
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
