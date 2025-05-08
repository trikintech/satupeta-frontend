"use client";

import { Mapset } from "@/shared/types/mapset";
import { useMapsetColumns } from "./components/list/column";
import mapsetApi from "@/shared/services/mapset";
import { useTableState } from "../hooks/use-table-state";
import { ResourceTable } from "../components/resource-table";
import { ColumnDef } from "@tanstack/react-table";
import { TabNavigation } from "./components/list/tab-navigation";
import { useTabState } from "../hooks/use-tab";

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
          title: "Organisasi tidak ditemukan",
        }}
        actionBarProps={{
          buttonLabel: "Tambah Organisasi",
          buttonLink: "/admin/mapset/add",
        }}
        refetchAction={refetch}
      />
    </>
  );
}
