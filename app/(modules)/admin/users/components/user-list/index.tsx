import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { UserResponse } from "@/shared/types/user";
import { useRouter } from "next/navigation";
import { DataTable } from "../../../components/data-table";

interface Props {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  users: UserResponse[];
  columns: (router: ReturnType<typeof useRouter>) => ColumnDef<UserResponse>[]; // Pass router to columns
}

export const UserList = ({
  isLoading,
  isError,
  error,
  users,
  columns,
}: Props) => {
  const router = useRouter();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-2">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center text-red-500">
          <p>Error loading users:</p>
          <p>{error?.message ?? "Unknown error"}</p>
        </div>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns(router)}
      data={users}
      searchColumn="name"
      searchPlaceholder="Search users..."
    />
  );
};
