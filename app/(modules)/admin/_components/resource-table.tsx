"use client";

import { RefreshCwIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "./data-table";
import { EmptyState } from "./empty-state";
import LoadingSpinner from "@/shared/components/loading-spinner";
import SearchAndActionBar from "./search-action-bar";
import Image from "next/image";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { useState } from "react";

interface ResourceTableProps<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  refetchAction: () => void;
  searchValue: string;
  onSearchChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sorting: SortingState;
  onSortingChangeAction: (sorting: SortingState) => void;
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  onPaginationChangeAction: (params: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  emptyStateProps: {
    title: string;
    icon?: React.ReactNode;
    description?: string;
  };
  actionBarProps: {
    buttonLabel: string;
    buttonLink: string;
    bulkLabel?: string;
    showBulkAction?: boolean;
    onBulkAction?: (selectedRows: T[]) => void;
  };
  enableRowSelection?: boolean;
}

export function ResourceTable<T>({
  data,
  columns,
  total,
  isLoading,
  isError,
  refetchAction,
  searchValue,
  onSearchChangeAction,
  sorting,
  onSortingChangeAction,
  pageIndex,
  pageCount,
  pageSize,
  onPaginationChangeAction,
  emptyStateProps,
  actionBarProps,
  enableRowSelection,
}: ResourceTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const defaultEmptyIcon = (
    <div className="text-gray-400 mx-auto mb-4">
      <Image
        src="/empty-box.png"
        alt="Data tidak ditemukan"
        width={64}
        height={64}
      />
    </div>
  );

  const handleBulkAction = () => {
    if (actionBarProps.onBulkAction) {
      actionBarProps.onBulkAction(selectedRows);
    }
  };

  const handleRowSelectionChange = (rows: T[]) => {
    setSelectedRows(rows);
  };

  return (
    <div className="space-y-4">
      <SearchAndActionBar
        buttonLabel={actionBarProps.buttonLabel}
        buttonLink={actionBarProps.buttonLink}
        searchValue={searchValue}
        onChange={onSearchChangeAction}
        selectedCount={selectedRows.length}
        onBulkAction={handleBulkAction}
        bulkLabel={actionBarProps.bulkLabel}
        showBulkAction={actionBarProps.showBulkAction}
      />

      {(() => {
        if (isLoading) {
          return (
            <div className="mt-8 flex justify-center">
              <LoadingSpinner />
            </div>
          );
        } else if (isError) {
          return (
            <EmptyState
              icon={<RefreshCwIcon className="h-10 w-10 text-gray-400" />}
              title="Error memuat data"
              description="Terjadi kesalahan saat memuat data. Silakan coba lagi."
              action={
                <Button onClick={() => refetchAction()}>Coba Lagi</Button>
              }
            />
          );
        } else if (data.length === 0) {
          return (
            <EmptyState
              icon={emptyStateProps.icon || defaultEmptyIcon}
              title={emptyStateProps.title}
              description={emptyStateProps.description || ""}
            />
          );
        } else {
          return (
            <DataTable<T, unknown>
              data={data}
              columns={columns}
              pageCount={pageCount}
              pageIndex={pageIndex}
              pageSize={pageSize}
              onPaginationChangeAction={onPaginationChangeAction}
              onRowSelectionChange={handleRowSelectionChange}
              manualPagination
              rowCount={total}
              sorting={sorting}
              onSortingChangeAction={onSortingChangeAction}
              enableRowSelection={enableRowSelection}
            />
          );
        }
      })()}
    </div>
  );
}
