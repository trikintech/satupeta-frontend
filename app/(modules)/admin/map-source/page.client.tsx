"use client";

import { MapSource } from "@/shared/types/map-source";
import mapSourceApi from "@/shared/services/map-source";

import { ColumnDef } from "@tanstack/react-table";

import { ResourceTable } from "../_components/resource-table";
import { useTableState } from "../_hooks/use-table-state";

import { useMapSourceColumns } from "./_components/column";

export default function MapSourcePageClient() {
  const columns = useMapSourceColumns();

  const {
    data: mapSources,
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
  } = useTableState<MapSource>({
    resourceName: "mapSources",
    fetchAction: mapSourceApi.getMapSources,
    defaultLimit: 10,
    defaultSort: { id: "created_at", desc: true },
  });

  return (
    <ResourceTable
      data={mapSources}
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
        title: "Mapserver & Metadata tidak ditemukan",
      }}
      actionBarProps={{
        buttonLabel: "Tambah Mapserver & Metadata",
        buttonLink: "/admin/map-source/add",
      }}
      refetchAction={refetch}
    />
  );
}
