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
  Edit,
  Trash,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Credential } from "@/shared/types/credential";
import credentialApi from "@/shared/services/credential";
import { toast } from "sonner";
import { hasPermission } from "@/shared/config/role";
import { useAuthSession } from "@/shared/hooks/use-session";
import { DeleteDialog } from "../../_components/delete-dialog";

interface ColumnConfig {
  id: string;
  header: string;
  accessor?: keyof Credential;
  accessorFn?: (row: Credential) => any;
  sortable?: boolean;
  cell?: (value: any) => React.ReactNode;
}

const COLUMN_CONFIGS: ColumnConfig[] = [
  {
    id: "name",
    header: "Nama Kredensial",
    accessor: "name",
    sortable: true,
  },
  {
    id: "credential_type",
    header: "Tipe Kredensial",
    accessor: "credential_type",
    sortable: true,
  },
  {
    id: "environment",
    header: "Environment",
    accessorFn: (row) => row.credential_metadata.environment,
    sortable: true,
  },
  {
    id: "version",
    header: "Versi",
    accessorFn: (row) => row.credential_metadata.version,
    sortable: true,
  },
  {
    id: "is_default",
    header: "Default",
    accessor: "is_default",
    sortable: true,
    cell: (value) => (
      <Badge variant={value ? "success" : "secondary"}>
        {value ? "Ya" : "Tidak"}
      </Badge>
    ),
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

export const useCredentialColumns = (): ColumnDef<Credential>[] => {
  const router = useRouter();
  const [credentialToDelete, setCredentialToDelete] =
    useState<Credential | null>(null);
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  const userRole = session?.user?.role;

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await credentialApi.deleteCredential(id);
    },
    onSuccess: () => {
      toast.success("Berhasil menghapus credential");
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
      setCredentialToDelete(null);
    },
    onError: (error) => {
      toast.error("Gagal menghapus credential");
      console.error("Error deleting credential:", error);
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
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );

  const baseColumns = COLUMN_CONFIGS.map((config) => {
    const column: ColumnDef<Credential> = {
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
    (hasPermission(userRole, "credential", "read") ||
      hasPermission(userRole, "credential", "update") ||
      hasPermission(userRole, "credential", "delete"))
  ) {
    baseColumns.push({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const credential = row.original;

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
                {hasPermission(userRole, "credential", "update") && (
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/admin/credential/edit/${credential.id}`)
                    }
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Credential
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "credential", "delete") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setCredentialToDelete(credential)}
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                      Hapus Credential
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {credentialToDelete?.id === credential.id && (
              <DeleteDialog
                name={credentialToDelete.name}
                isDeleting={deleteMutation.isPending}
                onDelete={() => deleteMutation.mutate(credentialToDelete.id)}
                onCancel={() => setCredentialToDelete(null)}
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
