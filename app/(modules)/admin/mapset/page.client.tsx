"use client";

import { Mapset } from "@/shared/types/mapset";
import { useMapsetColumns } from "./_components/list/column";
import mapsetApi from "@/shared/services/mapset";
import { useTableState } from "../_hooks/use-table-state";
import { ResourceTable } from "../_components/resource-table";
import { ColumnDef } from "@tanstack/react-table";
import { TabNavigation } from "./_components/list/tab-navigation";
import { useTabState } from "../_hooks/use-tab";

export default function MapsetPageClient() {
  const columns = useMapsetColumns();
  const { currentTab } = useTabState();
  const {
    data: mapsets,
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
  } = useTableState<Mapset>({
    resourceName: "mapsets",
    fetchAction: mapsetApi.getMapsets,
    defaultLimit: 10,
    defaultSort: { id: "name", desc: false },
  });

  return (
    <>
      {" "}
      <TabNavigation activeTab={currentTab} />
      <ResourceTable
        data={mapsets}
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
          title: "Peta tidak ditemukan",
        }}
        actionBarProps={{
          buttonLabel: "Tambah Peta",
          buttonLink: "/admin/mapset/add",
        }}
        refetchAction={refetch}
      />
    </>
  );
}
