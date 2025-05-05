"use client";

import React, { useState } from "react";
import {
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { UserPlus } from "lucide-react";
import { userApi } from "@/shared/services/user";
import { ApiResponse } from "@/shared/types/api-response";
import { UserResponse } from "@/shared/types/user";
import { toast } from "sonner";
import Link from "next/link";
import { getUserTableColumns } from "./components/user-list/table-columns";
import { UserList } from "./components/user-list";
import DeleteDialog from "./components/confirmation-dialog";

export default function UsersPageClient() {
  const queryClient = useQueryClient();

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useQuery<ApiResponse<UserResponse[]>>({
    queryKey: ["users"],
    queryFn: () => userApi.getUsers(),
  });

  const onDelete = (user: UserResponse) => {
    setActionType("delete");
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const users = apiResponse?.data || [];
  const columns = getUserTableColumns(onDelete);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"delete" | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  const handleAction = async () => {
    if (!selectedUser || !actionType) return;

    try {
      if (actionType === "delete") {
        await userApi.deleteUser(selectedUser.id);
        toast.success("User deleted");
      }

      await queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      console.error(error);
      toast.error(`An error occurred while deleting the user.`);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <Link href="/admin/users/create">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent>
            <UserList
              isLoading={isLoading}
              isError={isError}
              error={error as Error}
              users={users}
              columns={columns}
            />
          </CardContent>
        </Card>

        <DeleteDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleAction}
          description="Are you sure you want to delete this user? This action cannot be undone."
          confirmVariant="destructive"
          confirmLabel="Delete"
        ></DeleteDialog>
      </div>
    </QueryClientProvider>
  );
}
