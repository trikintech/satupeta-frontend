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
import { Mapset } from "@/shared/types/mapset";
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
import { DeleteDialog } from "../../../_components/delete-dialog";
import mapsetApi from "@/shared/services/mapset";
import { toast } from "sonner";
import { hasPermission } from "@/shared/config/role";
import { useAuthSession } from "@/shared/hooks/use-session";
import { StatusValidationBadge } from "@/shared/components/status-validation-badge";
import { ConfirmationDialog } from "../../../_components/confirmation-dialog";

// Type for column configuration
interface ColumnConfig {
  id: string;
  header: string;
  accessor?: keyof Mapset;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessorFn?: (row: Mapset) => any;
  sortable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cell?: (value: any) => React.ReactNode;
}

// Default column configurations
const COLUMN_CONFIGS: ColumnConfig[] = [
  {
    id: "name",
    header: "Nama Mapset",
    accessor: "name",
    sortable: true,
  },
  {
    id: "classification",
    header: "Klasifikasi",
    accessorFn: (row) => row.classification?.name,
    sortable: false,
  },
  {
    id: "producer",
    header: "Instansi",
    accessorFn: (row) => row.producer?.name,
    sortable: false,
  },
  {
    id: "is_active",
    header: "Status Aktif",
    accessor: "is_active",
    sortable: true,
    cell: (value) => (
      <Badge variant={value ? "success" : "secondary"}>
        {value ? "Aktif" : "Tidak Aktif"}
      </Badge>
    ),
  },
  {
    id: "status_validation",
    accessor: "status_validation",
    header: "Status Validasi",
    cell: (value) => (
      <StatusValidationBadge
        status={value ?? "approved"}
      ></StatusValidationBadge>
    ),
  },
];

export const useMapsetColumns = (): ColumnDef<Mapset>[] => {
  const router = useRouter();
  const [mapsetToDelete, setMapsetToDelete] = useState<Mapset | null>(null);
  const queryClient = useQueryClient();
  const { session } = useAuthSession();
  const [mapsetToSubmit, setMapsetToSubmit] = useState<Mapset | null>(null);

  const userRole = session?.user?.role;

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await mapsetApi.deleteMapset(id);
    },
    onSuccess: () => {
      toast.success("Berhasil menghapus data");
      queryClient.invalidateQueries({ queryKey: ["mapsets"] });
      setMapsetToDelete(null);
    },
    onError: (error) => {
      toast.error("Gagal menghapus data");
      console.error("Error deleting mapset:", error);
    },
  });

  const submitValidationMutation = useMutation({
    mutationFn: async (id: string) => {
      return await mapsetApi.updateMapset(id, {
        status_validation: "on_verification",
      });
    },
    onSuccess: () => {
      toast.success("Berhasil mengajukan validasi");
      queryClient.invalidateQueries({ queryKey: ["mapsets"] });
    },
    onError: (error) => {
      toast.error("Gagal mengajukan validasi");
      console.error("Error submitting for validation:", error);
    },
  });

  // Helper function to render sortable header
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // Generate base columns from config
  const baseColumns = COLUMN_CONFIGS.map((config) => {
    const column: ColumnDef<Mapset> = {
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
    (hasPermission(userRole, "mapset", "read") ||
      hasPermission(userRole, "mapset", "update") ||
      hasPermission(userRole, "mapset", "delete"))
  ) {
    baseColumns.push({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const mapset = row.original;

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
                {hasPermission(userRole, "mapset", "read") && (
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/admin/mapset/detail/${mapset.id}`)
                    }
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Lihat Detail
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "mapset", "update") && (
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/admin/mapset/edit/${mapset.id}`)
                    }
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Mapset
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "mapset", "update") &&
                  mapset.status_validation === "rejected" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setMapsetToSubmit(mapset)}
                        className="flex items-center gap-2 text-warning focus:text-warning"
                      >
                        <ArrowUp className="h-4 w-4" />
                        Ajukan Validasi
                      </DropdownMenuItem>
                    </>
                  )}
                {hasPermission(userRole, "mapset", "delete") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setMapsetToDelete(mapset)}
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                      Hapus Mapset
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {mapsetToDelete?.id === mapset.id && (
              <DeleteDialog
                name={mapsetToDelete?.name}
                isDeleting={deleteMutation.isPending}
                onDelete={() => deleteMutation.mutate(mapsetToDelete.id)}
                onCancel={() => setMapsetToDelete(null)}
                open={true}
              />
            )}

            {mapsetToSubmit?.id === mapset.id && (
              <ConfirmationDialog
                open={mapsetToSubmit?.id === mapset.id}
                title="Ajukan Validasi"
                description={`Ajukan mapset "${mapset.name}" ke status validasi?`}
                confirmText="Ajukan"
                isLoading={submitValidationMutation.isPending}
                onConfirm={() => submitValidationMutation.mutate(mapset.id)}
                onCancel={() => setMapsetToSubmit(null)}
                variant="primary"
              />
            )}
          </>
        );
      },
    });
  }

  return baseColumns;
};
