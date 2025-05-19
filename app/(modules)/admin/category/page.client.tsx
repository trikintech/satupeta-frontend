"use client";

import { Category } from "@/shared/types/category";
import { useCategoryColumns } from "./_components/column";
import categoryApi from "@/shared/services/category";
import { useTableState } from "../_hooks/use-table-state";
import { ResourceTable } from "../_components/resource-table";
import { ColumnDef } from "@tanstack/react-table";

export default function CategoryPageClient() {
  const columns = useCategoryColumns();

  const {
    data: categories,
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
  } = useTableState<Category>({
    resourceName: "categories",
    fetchAction: categoryApi.getCategories,
    defaultLimit: 10,
    defaultSort: { id: "created_at", desc: true },
  });

  return (
    <ResourceTable
      data={categories}
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
        title: "Kategori tidak ditemukan",
      }}
      actionBarProps={{
        buttonLabel: "Tambah Kategori",
        buttonLink: "/admin/category/add",
      }}
      refetchAction={refetch}
    />
  );
}
