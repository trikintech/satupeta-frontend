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
  ChevronsUpDown,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteDialog } from "../../../_components/delete-dialog";
import mapsetApi from "@/shared/services/mapset";
import { toast } from "sonner";
import { hasPermission } from "@/shared/config/role";
import { useAuthSession } from "@/shared/hooks/use-session";
import { ConfirmationDialog } from "../../../_components/confirmation-dialog";
import StatusValidation, {
  statusValidationLabel,
} from "@/shared/config/status-validation";

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
    cell: (value) => (
      <div
        className="truncate max-w-[300px] 2xl:max-w-[500px]"
        title={value as string}
      >
        {value as string}
      </div>
    ),
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
    cell: (value) => (
      <div
        className="truncate max-w-[250px] 2xl:max-w-[300px]"
        title={value as string}
      >
        {value as string}
      </div>
    ),
  },
  {
    id: "is_active",
    header: "Status Aktif",
    accessor: "is_active",
    sortable: true,
    cell: (value) => (value ? "Aktif" : "Non-aktif"),
  },
  {
    id: "status_validation",
    accessor: "status_validation",
    header: "Status Validasi",
    cell: (value: StatusValidation) => statusValidationLabel[value],
  },
];

export const useMapsetColumns = (): ColumnDef<Mapset>[] => {
  const router = useRouter();
  const [mapsetToDelete, setMapsetToDelete] = useState<Mapset | null>(null);
  const queryClient = useQueryClient();
  const { session } = useAuthSession();
  const [mapsetToSubmit, setMapsetToSubmit] = useState<Mapset | null>(null);
  const [mapsetToToggle, setMapsetToToggle] = useState<Mapset | null>(null);

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

  const toggleActiveMutation = useMutation({
    mutationFn: async ({
      id,
      is_active,
    }: {
      id: string;
      is_active: boolean;
    }) => {
      return await mapsetApi.updateMapset(id, { is_active });
    },
    onSuccess: () => {
      toast.success("Berhasil mengubah status aktif");
      queryClient.invalidateQueries({ queryKey: ["mapsets"] });
      setMapsetToToggle(null);
    },
    onError: (error) => {
      toast.error("Gagal mengubah status aktif");
      console.error("Error toggling active status:", error);
    },
  });

  // Helper function to render sortable header
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderSortableHeader = (column: any, label: string) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="p-0 hover:bg-transparent flex items-center"
    >
      {label}
      {(() => {
        if (column.getIsSorted() === "asc") {
          return <ChevronUp className="ml-2 h-4 w-4" />;
        } else if (column.getIsSorted() === "desc") {
          return <ChevronDown className="ml-2 h-4 w-4" />;
        } else {
          return <ChevronsUpDown className="ml-2 h-4 w-4" />;
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
                    Lihat Detail
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "mapset", "update") && (
                  <>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/admin/mapset/edit/${mapset.id}`)
                      }
                      className="flex items-center gap-2"
                    >
                      Edit Mapset
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setMapsetToToggle(mapset)}
                      className="flex items-center gap-2"
                    >
                      {mapset.is_active ? "Nonaktifkan" : "Aktifkan"} Mapset
                    </DropdownMenuItem>
                  </>
                )}
                {hasPermission(userRole, "mapset", "update") &&
                  mapset.status_validation === "rejected" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setMapsetToSubmit(mapset)}
                        className="flex items-center gap-2 text-warning focus:text-warning"
                      >
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

            {mapsetToToggle?.id === mapset.id && (
              <ConfirmationDialog
                open={mapsetToToggle?.id === mapset.id}
                title={
                  mapset.is_active ? "Nonaktifkan Mapset" : "Aktifkan Mapset"
                }
                description={`Apakah Anda yakin ingin ${
                  mapset.is_active ? "menonaktifkan" : "mengaktifkan"
                } mapset "${mapset.name}"?`}
                confirmText={mapset.is_active ? "Nonaktifkan" : "Aktifkan"}
                isLoading={toggleActiveMutation.isPending}
                onConfirm={() =>
                  toggleActiveMutation.mutate({
                    id: mapset.id,
                    is_active: !mapset.is_active,
                  })
                }
                onCancel={() => setMapsetToToggle(null)}
                variant={mapset.is_active ? "destructive" : "primary"}
              />
            )}
          </>
        );
      },
    });
  }

  return baseColumns;
};
