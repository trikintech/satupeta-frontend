"use client";

import { RefreshCwIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { DataTable } from "./data-table";
import { EmptyState } from "./empty-state";
import LoadingSpinner from "@/shared/components/loading-spinner";
import SearchAndActionBar from "./search-action-bar";
import Image from "next/image";
import { ColumnDef, SortingState } from "@tanstack/react-table";

interface ResourceTableProps<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[]; // Replace `any` with `unknown` for better type safety
  total: number;
  isLoading: boolean;
  isError: boolean;
  refetchAction: () => void;
  searchValue: string;
  onSearchChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sorting: SortingState; // Use `SortingState` from `@tanstack/react-table`
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
  };
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
}: ResourceTableProps<T>) {
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

  return (
    <div className="space-y-4">
      <SearchAndActionBar
        buttonLabel={actionBarProps.buttonLabel}
        buttonLink={actionBarProps.buttonLink}
        searchValue={searchValue}
        onChange={onSearchChangeAction}
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
            <DataTable<T, unknown> // Replace `any` with `unknown`
              data={data}
              columns={columns}
              pageCount={pageCount}
              pageIndex={pageIndex}
              pageSize={pageSize}
              onPaginationChangeAction={onPaginationChangeAction}
              manualPagination
              rowCount={total}
              sorting={sorting}
              onSortingChangeAction={onSortingChangeAction}
            />
          );
        }
      })()}
    </div>
  );
}
