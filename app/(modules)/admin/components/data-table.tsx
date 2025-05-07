"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Pagination } from "@/shared/components/ui/pagination";
import { useState, useEffect } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  onPaginationChange: (pagination: PaginationState) => void;
  manualPagination?: boolean;
  rowCount: number;
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pageIndex,
  pageSize,
  sorting,
  onSortingChange,
  onPaginationChange,
  manualPagination = true,
  rowCount,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });

  // Sync internal state with props
  useEffect(() => {
    if (
      pagination.pageIndex !== pageIndex ||
      pagination.pageSize !== pageSize
    ) {
      setPagination({ pageIndex, pageSize });
    }
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination,
    manualSorting: true,
    pageCount,
    rowCount,
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;

      if (
        pagination.pageIndex !== newPagination.pageIndex ||
        pagination.pageSize !== newPagination.pageSize
      ) {
        setPagination(newPagination);
        onPaginationChange(newPagination);
      }
    },
    onSortingChange: (updaterOrValue) => {
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting)
          : updaterOrValue;
      onSortingChange(newSorting);
    },
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {Object.keys(rowSelection).length} dari {rowCount} baris dipilih.
        </div>
        <Pagination
          totalPages={pageCount}
          currentPage={pageIndex + 1}
          onPageChange={(page: number) => table.setPageIndex(page - 1)}
          perPage={pageSize}
          onPerPageChange={(perPage: number) => table.setPageSize(perPage)}
        />
      </div>
    </div>
  );
}
