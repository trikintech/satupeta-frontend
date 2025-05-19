"use client";

import { User } from "@/shared/types/user";
import { useUserColumns } from "./_components/column";
import userApi from "@/shared/services/user";
import { useTableState } from "../_hooks/use-table-state";
import { ResourceTable } from "../_components/resource-table";
import { ColumnDef } from "@tanstack/react-table";

export default function UserPageClient() {
  const columns = useUserColumns();

  const {
    data: users,
    total,
    isLoading,
    isError,
    refetch,
    searchValue,
    sorting,
    handleSearchInputChange,
    handlePaginationChange,
    updateSortingParams,
    pageIndex,
    pageCount,
    limit,
    setSorting,
  } = useTableState<User>({
    resourceName: "users",
    fetchAction: userApi.getUsers,
    defaultLimit: 10,
    defaultSort: { id: "created_at", desc: true },
  });

  return (
    <ResourceTable
      data={users}
      columns={columns as ColumnDef<unknown, unknown>[]}
      total={total}
      isLoading={isLoading}
      isError={isError}
      searchValue={searchValue}
      onSearchChangeAction={handleSearchInputChange}
      sorting={sorting}
      onSortingChangeAction={(newSorting) => {
        setSorting(newSorting);
        updateSortingParams(newSorting);
      }}
      pageIndex={pageIndex}
      pageCount={pageCount}
      pageSize={limit}
      onPaginationChangeAction={handlePaginationChange}
      emptyStateProps={{
        title: "User tidak ditemukan",
      }}
      actionBarProps={{
        buttonLabel: "Tambah User",
        buttonLink: "/admin/user/add",
      }}
      refetchAction={refetch}
    />
  );
}
