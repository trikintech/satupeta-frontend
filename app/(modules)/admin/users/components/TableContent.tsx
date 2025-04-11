import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/shared/types/user";
import { DataTable } from "../../components/DataTable";

interface Props {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  users: User[];
  columns: ColumnDef<User>[];
  openDialog: (type: "delete", user: User) => void;
}

export const TableContent = ({
  isLoading,
  isError,
  error,
  users,
  columns,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openDialog,
}: Props) => {
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
      columns={columns}
      data={users}
      searchColumn="name"
      searchPlaceholder="Search users..."
    />
  );
};
