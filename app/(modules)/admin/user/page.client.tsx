"use client";

import { User } from "@/shared/types/user";
import userApi from "@/shared/services/user";

import { ColumnDef } from "@tanstack/react-table";

import { ResourceTable } from "../_components/resource-table";
import { useTableState } from "../_hooks/use-table-state";

import { useUserColumns } from "./_components/column";

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
    defaultSort: { id: "name", desc: false },
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
