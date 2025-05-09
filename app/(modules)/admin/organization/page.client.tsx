"use client";

import { Organization } from "@/shared/types/organization";
import { useOrganizationColumns } from "./_components/column";
import organizationApi from "@/shared/services/organization";
import { useTableState } from "../_hooks/use-table-state";
import { ResourceTable } from "../_components/resource-table";
import { ColumnDef } from "@tanstack/react-table";

export default function OrganizationPageClient() {
  const columns = useOrganizationColumns();

  const {
    data: organizations,
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
  } = useTableState<Organization>({
    resourceName: "organizations",
    fetchAction: organizationApi.getOrganizations,
    defaultLimit: 10,
    defaultSort: { id: "name", desc: false },
  });

  return (
    <ResourceTable
      data={organizations}
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
        title: "Organisasi tidak ditemukan",
      }}
      actionBarProps={{
        buttonLabel: "Tambah Perangkat Daerah",
        buttonLink: "/admin/organization/add",
      }}
      refetchAction={refetch}
    />
  );
}
