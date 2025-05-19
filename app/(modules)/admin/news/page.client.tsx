"use client";

import { News } from "@/shared/types/news";
import { useNewsColumns } from "./_components/column";
import newsApi from "@/shared/services/news";
import { useTableState } from "../_hooks/use-table-state";
import { ResourceTable } from "../_components/resource-table";
import { ColumnDef } from "@tanstack/react-table";

export default function NewsPageClient() {
  const columns = useNewsColumns();

  const {
    data: news,
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
    resourceName: "news",
    fetchAction: newsApi.getNewsList,
    defaultLimit: 10,
    defaultSort: { id: "name", desc: false },
  });

  return (
    <ResourceTable
      data={news}
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
        title: "Konten tidak ditemukan",
      }}
      actionBarProps={{
        buttonLabel: "Tambah Konten",
        buttonLink: "/admin/news/add",
      }}
      refetchAction={refetch}
    />
  );
}
