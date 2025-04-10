"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Added useQueryClient
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { UserPlus } from "lucide-react";
import { userApi } from "@/shared/services/user";
import { ApiResponse } from "@/shared/types/api-response";
import { User } from "@/shared/types/user";
import { getUserTableColumns } from "./components/TableColumns";
import { TableContent } from "./components/TableContent";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

export default function UsersPage() {
  const queryClient = useQueryClient(); // Get queryClient instance

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useQuery<ApiResponse<User[]>>({
    queryKey: ["users"],
    queryFn: () => userApi.getUsers(),
  });

  const openDialog = (type: "delete" | "deactivate", user: User) => {
    setActionType(type);
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const users = apiResponse?.data || [];
  const columns = getUserTableColumns(openDialog);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "deactivate" | null>(
    null
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAction = async () => {
    if (!selectedUser || !actionType) return;

    try {
      if (actionType === "delete") {
        await userApi.deleteUser(selectedUser.id);
        toast.success("User permanently deleted");
      } else if (actionType === "deactivate") {
        await userApi.deleteUser(selectedUser.id);
        toast.success("User deactivated");
      }

      // Invalidate the query to trigger a refetch
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      console.error(error);
      toast.error(
        `An error occurred while ${
          actionType === "delete" ? "deleting" : "deactivating"
        } the user.`
      );
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage your users and their organization access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TableContent
            isLoading={isLoading}
            isError={isError}
            error={error as Error}
            users={users}
            columns={columns}
            openDialog={openDialog}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Confirm {actionType === "delete" ? "Deletion" : "Deactivation"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "delete"
                ? "Are you sure you want to permanently delete this user? This action is irreversible."
                : "Are you sure you want to deactivate this user?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleAction}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
