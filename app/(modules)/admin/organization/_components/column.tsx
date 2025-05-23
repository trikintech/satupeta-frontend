/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/shared/components/ds/badge";
import { Button } from "@/shared/components/ds/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Organization } from "@/shared/types/organization";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  Edit,
  Trash,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import organizationApi from "@/shared/services/organization";
import { toast } from "sonner";
import { hasPermission } from "@/shared/config/role";
import { DeleteDialog } from "../../_components/delete-dialog";
import { useAuthSession } from "@/shared/hooks/use-session";

interface ColumnConfig {
  id: string;
  header: string;
  accessor?: keyof Organization;
  accessorFn?: (row: Organization) => any;
  sortable?: boolean;
  cell?: (value: any) => React.ReactNode;
}

const COLUMN_CONFIGS: ColumnConfig[] = [
  {
    id: "name",
    header: "Nama Perangkat Daerah",
    accessor: "name",
    sortable: true,
  },
  {
    id: "email",
    header: "Email",
    accessor: "email",
    sortable: true,
  },
  {
    id: "phone_number",
    header: "Telepon",
    accessor: "phone_number",
    sortable: false,
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

export const useOrganizationColumns = (): ColumnDef<Organization>[] => {
  const router = useRouter();
  const [organizationToDelete, setOrganizationToDelete] =
    useState<Organization | null>(null);
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  const userRole = session?.user?.role;

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await organizationApi.deleteOrganization(id);
    },
    onSuccess: () => {
      toast.success("Berhasil menghapus data");
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      setOrganizationToDelete(null);
    },
    onError: (error) => {
      toast.error("Gagal menghapus data");
      console.error("Error deleting organization:", error);
    },
  });

  const renderSortableHeader = (column: any, label: string) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="p-0 hover:bg-transparent"
    >
      {label}
      {(() => {
        if (column.getIsSorted() === "asc") {
          return <ArrowUp className="ml-2 h-4 w-4" />;
        } else if (column.getIsSorted() === "desc") {
          return <ArrowDown className="ml-2 h-4 w-4" />;
        } else {
          return <ArrowUpDown className="ml-2 h-4 w-4" />;
        }
      })()}
    </Button>
  );

  const baseColumns = COLUMN_CONFIGS.map((config) => {
    const column: ColumnDef<Organization> = {
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
    (hasPermission(userRole, "organization", "read") ||
      hasPermission(userRole, "organization", "update") ||
      hasPermission(userRole, "organization", "delete"))
  ) {
    baseColumns.push({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const organization = row.original;

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
                {hasPermission(userRole, "organization", "read") && (
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        `/admin/organization/detail/${organization.id}`
                      )
                    }
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Lihat Detail
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "organization", "update") && (
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/admin/organization/edit/${organization.id}`)
                    }
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Perangkat Daerah
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "organization", "delete") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setOrganizationToDelete(organization)}
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                      Hapus Perangkat Daerah
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {organizationToDelete?.id === organization.id && (
              <DeleteDialog
                name={organizationToDelete.name}
                isDeleting={deleteMutation.isPending}
                onDelete={() => deleteMutation.mutate(organizationToDelete.id)}
                onCancel={() => setOrganizationToDelete(null)}
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
