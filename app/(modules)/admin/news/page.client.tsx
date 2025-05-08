"use client";

import { News } from "@/shared/types/news";
import { useNewsColumns } from "./components/column";
import newsApi from "@/shared/services/news";
import { useTableState } from "../hooks/use-table-state";
import { ResourceTable } from "../components/resource-table";
import { ColumnDef } from "@tanstack/react-table";

export default function NewsPageClient() {
  const columns = useNewsColumns();

  const {
    data: newss,
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
  } = useTableState<News>({
    resourceName: "newss",
    fetchAction: newsApi.getAllNews,
    defaultLimit: 10,
    defaultSort: { id: "name", desc: false },
  });

  return (
    <ResourceTable
      data={newss}
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
        buttonLabel: "Tambah Organisasi",
        buttonLink: "/admin/news/add",
      }}
      refetchAction={refetch}
    />
  );
}
