"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
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

export default function UsersPage() {
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useQuery<ApiResponse<User[]>>({
    queryKey: ["users"],
    queryFn: () => userApi.getUsers({}),
  });

  const users = apiResponse?.data || [];
  const columns = getUserTableColumns();

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
          />
        </CardContent>
      </Card>
    </div>
  );
}
