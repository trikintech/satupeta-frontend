/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/shared/components/ds/badge";
import { Button } from "@/shared/components/ui/button";
import {
  MoreHorizontal,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import Image from "next/image";
import { Category } from "@/shared/types/category";
import { getFileThumbnailUrl } from "@/shared/utils/file";
import categoryApi from "@/shared/services/category";
import { toast } from "sonner";
import { hasPermission } from "@/shared/config/role";
import { useAuthSession } from "@/shared/hooks/use-session";
import { DeleteDialog } from "../../_components/delete-dialog";

interface ColumnConfig {
  id: string;
  header: string;
  accessor?: keyof Category;
  accessorFn?: (row: Category) => any;
  sortable?: boolean;
  cell?: (value: any) => React.ReactNode;
}

const COLUMN_CONFIGS: ColumnConfig[] = [
  {
    id: "name",
    header: "Nama Kategori",
    accessor: "name",
    sortable: true,
  },
  {
    id: "description",
    header: "Deskripsi",
    accessor: "description",
    sortable: true,
  },
  {
    id: "thumbnail",
    header: "Thumbnail",
    accessor: "thumbnail",
    sortable: false,
    cell: (value) =>
      value ? (
        <div className="relative h-10 w-10">
          <Image
            src={getFileThumbnailUrl(value)}
            alt="Thumbnail"
            fill
            className="object-cover rounded-md"
          />
        </div>
      ) : null,
  },
  {
    id: "is_active",
    header: "Status",
    accessor: "is_active",
    sortable: true,
    cell: (value) => (
      <Badge variant={value ? "success" : "secondary"}>
        {value ? "Aktif" : "Tidak Aktif"}
      </Badge>
    ),
  },
];

export const useCategoryColumns = (): ColumnDef<Category>[] => {
  const router = useRouter();
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  const userRole = session?.user?.role;

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await categoryApi.deleteCategory(id);
    },
    onSuccess: () => {
      toast.success("Berhasil menghapus kategori");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setCategoryToDelete(null);
    },
    onError: (error) => {
      toast.error("Gagal menghapus kategori");
      console.error("Error deleting category:", error);
    },
  });

  const renderSortableHeader = (column: any, label: string) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="p-0 hover:bg-transparent"
    >
      {label}
      {column.getIsSorted() === "asc" ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <ChevronDown className="ml-2 h-4 w-4" />
      ) : (
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );

  const baseColumns = COLUMN_CONFIGS.map((config) => {
    const column: ColumnDef<Category> = {
      id: config.id,
      header: ({ column }) =>
        config.sortable
          ? renderSortableHeader(column, config.header)
          : config.header,
      ...(config.accessor && { accessorKey: config.accessor }),
      ...(config.accessorFn && { accessorFn: config.accessorFn }),
      cell: ({ row }) => {
        const value = row.getValue(config.id);
        return config.cell ? (
          config.cell(value)
        ) : (
          <div>{value as React.ReactNode}</div>
        );
      },
      enableSorting: config.sortable !== false,
      enableHiding: config.id !== "select" && config.id !== "actions",
    };

    return column;
  });

  if (
    userRole &&
    (hasPermission(userRole, "category", "read") ||
      hasPermission(userRole, "category", "update") ||
      hasPermission(userRole, "category", "delete"))
  ) {
    baseColumns.push({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original;

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                {hasPermission(userRole, "category", "read") && (
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/admin/category/detail/${category.id}`)
                    }
                    className="flex items-center gap-2"
                  >
                    Lihat Detail
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "category", "update") && (
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/admin/category/edit/${category.id}`)
                    }
                    className="flex items-center gap-2"
                  >
                    Edit Kategori
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "category", "delete") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setCategoryToDelete(category)}
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                    >
                      Hapus Kategori
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {categoryToDelete?.id === category.id && (
              <DeleteDialog
                name={categoryToDelete.name}
                isDeleting={deleteMutation.isPending}
                onDelete={() => deleteMutation.mutate(categoryToDelete.id)}
                onCancel={() => setCategoryToDelete(null)}
                open={true}
              />
            )}
          </>
        );
      },
    });
  }

  return baseColumns;
};
