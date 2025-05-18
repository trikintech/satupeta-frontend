"use client";

import { Credential } from "@/shared/types/credential";
import { useCredentialColumns } from "./_components/column";
import credentialApi from "@/shared/services/credential";
import { useTableState } from "../_hooks/use-table-state";
import { ResourceTable } from "../_components/resource-table";
import { ColumnDef } from "@tanstack/react-table";

export default function CredentialPageClient() {
  const columns = useCredentialColumns();

  const {
    data: credentials,
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
  } = useTableState<Credential>({
    resourceName: "credentials",
    fetchAction: credentialApi.getCredentials,
    defaultLimit: 10,
    defaultSort: { id: "created_at", desc: true },
  });

  return (
    <ResourceTable
      data={credentials}
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
        title: "Kredensial tidak ditemukan",
      }}
      actionBarProps={{
        buttonLabel: "Tambah Kredensial",
        buttonLink: "/admin/credential/add",
      }}
      refetchAction={refetch}
    />
  );
}
