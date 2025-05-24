"use client";

import { Mapset } from "@/shared/types/mapset";
import { useMapsetColumns } from "./_components/list/column";
import mapsetApi from "@/shared/services/mapset";
import { useTableState } from "../_hooks/use-table-state";
import { ResourceTable } from "../_components/resource-table";
import { ColumnDef } from "@tanstack/react-table";
import { TabNavigation } from "./_components/list/tab-navigation";
import { useTabState } from "../_hooks/use-tab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { ConfirmationDialog } from "../_components/confirmation-dialog";

export default function MapsetPageClient() {
  const columns = useMapsetColumns();
  const { currentTab } = useTabState();
  const queryClient = useQueryClient();
  const [selectedMapsetsForBulk, setSelectedMapsetsForBulk] = useState<
    Mapset[]
  >([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
    defaultSort: { id: "created_at", desc: true },
  });

  const bulkDeactivateMutation = useMutation({
    mutationFn: (mapsetIds: string[]) => mapsetApi.bulkDeactivate(mapsetIds),
    onSuccess: () => {
      toast.success("Mapset berhasil dinonaktifkan");
      queryClient.invalidateQueries({ queryKey: ["mapsets"] });
      setShowConfirmDialog(false);
      setSelectedMapsetsForBulk([]);
    },
    onError: () => {
      toast.error("Gagal menonaktifkan mapset");
      setShowConfirmDialog(false);
    },
  });

  const handleBulkAction = (selectedRows: Mapset[]) => {
    setSelectedMapsetsForBulk(selectedRows);
    setShowConfirmDialog(true);
  };

  const confirmBulkAction = () => {
    const mapsetIds = selectedMapsetsForBulk.map((mapset) => mapset.id);
    bulkDeactivateMutation.mutate(mapsetIds);
  };

  const cancelBulkAction = () => {
    setShowConfirmDialog(false);
    setSelectedMapsetsForBulk([]);
  };

  return (
    <>
      <TabNavigation activeTab={currentTab} />
      <ResourceTable
        data={mapsets}
        columns={columns as ColumnDef<Mapset, unknown>[]}
        total={total}
        isLoading={isLoading}
        isError={isError}
        searchValue={searchValue}
        onSearchChangeAction={handleSearchInputChange}
        sorting={sorting}
        enableRowSelection={true}
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
          bulkLabel: "Non-Aktif Mapset",
          showBulkAction: true,
          onBulkAction: handleBulkAction,
        }}
        refetchAction={refetch}
      />

      <ConfirmationDialog
        open={showConfirmDialog}
        title="Konfirmasi Nonaktifkan Mapset"
        description={`Apakah Anda yakin ingin menonaktifkan ${selectedMapsetsForBulk.length} mapset yang dipilih?`}
        confirmText="Nonaktifkan"
        variant="destructive"
        isLoading={bulkDeactivateMutation.isPending}
        onConfirm={confirmBulkAction}
        onCancel={cancelBulkAction}
      />
    </>
  );
}
