"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
  SortingState,
  Updater,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Pagination } from "@/shared/components/ui/pagination";
import { useState, useEffect, useMemo } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  onPaginationChangeAction: (pagination: PaginationState) => void;
  manualPagination?: boolean;
  rowCount: number;
  sorting: SortingState;
  onSortingChangeAction: (sorting: SortingState) => void;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  enableRowSelection?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pageIndex,
  pageSize,
  sorting,
  onSortingChangeAction,
  onPaginationChangeAction,
  onRowSelectionChange,
  enableRowSelection = false,
  manualPagination = true,
  rowCount,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });

  const columnsWithSelection = useMemo<ColumnDef<TData, TValue>[]>(() => {
    if (!enableRowSelection) return columns;

    return [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      ...columns,
    ];
  }, [columns, enableRowSelection]);

  useEffect(() => {
    if (
      pagination.pageIndex !== pageIndex ||
      pagination.pageSize !== pageSize
    ) {
      setPagination({ pageIndex, pageSize });
    }
  }, [pagination.pageIndex, pagination.pageSize, pageIndex, pageSize]);

  useEffect(() => {
    setRowSelection({});
  }, [pageIndex]);

  const table = useReactTable({
    data,
    columns: columnsWithSelection,
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
    onPaginationChange: (updater: Updater<PaginationState>) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;

      if (
        pagination.pageIndex !== newPagination.pageIndex ||
        pagination.pageSize !== newPagination.pageSize
      ) {
        setPagination(newPagination);
        onPaginationChangeAction(newPagination);
      }
    },
    onSortingChange: (updaterOrValue: Updater<SortingState>) => {
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting)
          : updaterOrValue;
      onSortingChangeAction(newSorting);
    },
    onRowSelectionChange: enableRowSelection
      ? (updater) => {
          const newSelection =
            typeof updater === "function" ? updater(rowSelection) : updater;
          setRowSelection(newSelection);

          if (onRowSelectionChange) {
            const selectedRowIndices = Object.keys(newSelection).filter(
              (key) => newSelection[key]
            );
            const selectedRows = selectedRowIndices
              .map((index) => data[parseInt(index)])
              .filter(Boolean);
            onRowSelectionChange(selectedRows);
          }
        }
      : undefined,
    enableRowSelection,
    getRowId: (row, index) => index.toString(),
  });

  const selectedRowCount = Object.keys(rowSelection).filter(
    (key) => rowSelection[key]
  ).length;

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
                  colSpan={columnsWithSelection.length}
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
        {enableRowSelection ? (
          <div className="text-sm text-gray-500">
            {selectedRowCount} dari {data.length} baris dipilih.
          </div>
        ) : (
          <div></div>
        )}
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
