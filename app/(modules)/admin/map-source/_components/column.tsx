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
import { MapSource } from "@/shared/types/map-source";
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
import mapSourceApi from "@/shared/services/map-source";
import { toast } from "sonner";
import { hasPermission } from "@/shared/config/role";
import { DeleteDialog } from "../../_components/delete-dialog";
import { useAuthSession } from "@/shared/hooks/use-session";

interface ColumnConfig {
  id: string;
  header: string;
  accessor?: keyof MapSource;
  accessorFn?: (row: MapSource) => any;
  sortable?: boolean;
  cell?: (value: any) => React.ReactNode;
}

const COLUMN_CONFIGS: ColumnConfig[] = [
  {
    id: "name",
    header: "Nama Mapserver & Metadata",
    accessor: "name",
    sortable: true,
  },
  {
    id: "credential_type",
    header: "Tipe",
    accessorFn: (row) => row.credential.credential_type,
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
  {
    id: "created_at",
    header: "Dibuat Pada",
    accessor: "created_at",
    sortable: true,
    cell: (value) =>
      new Date(value).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
  {
    id: "updated_at",
    header: "Diperbarui Pada",
    accessor: "updated_at",
    sortable: true,
    cell: (value) =>
      new Date(value).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
];

export const useMapSourceColumns = (): ColumnDef<MapSource>[] => {
  const router = useRouter();
  const [mapSourceToDelete, setMapSourceToDelete] = useState<MapSource | null>(
    null
  );
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  const userRole = session?.user?.role;

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await mapSourceApi.deleteMapSource(id);
    },
    onSuccess: () => {
      toast.success("Berhasil menghapus data");
      queryClient.invalidateQueries({ queryKey: ["mapSources"] });
      setMapSourceToDelete(null);
    },
    onError: (error) => {
      toast.error("Gagal menghapus data");
      console.error("Error deleting mapSource:", error);
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
          return <ChevronUp className="ml-2 h-4 w-4" />;
        } else if (column.getIsSorted() === "desc") {
          return <ChevronDown className="ml-2 h-4 w-4" />;
        } else {
          return <ChevronsUpDown className="ml-2 h-4 w-4" />;
        }
      })()}
    </Button>
  );

  const baseColumns = COLUMN_CONFIGS.map((config) => {
    const column: ColumnDef<MapSource> = {
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
    (hasPermission(userRole, "map-source", "read") ||
      hasPermission(userRole, "map-source", "update") ||
      hasPermission(userRole, "map-source", "delete"))
  ) {
    baseColumns.push({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const mapSource = row.original;

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
                {hasPermission(userRole, "map-source", "read") && (
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/admin/map-source/detail/${mapSource.id}`)
                    }
                    className="flex items-center gap-2"
                  >
                    Lihat Detail
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "map-source", "update") && (
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/admin/map-source/edit/${mapSource.id}`)
                    }
                    className="flex items-center gap-2"
                  >
                    Edit Mapserver & Metadata
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "map-source", "delete") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setMapSourceToDelete(mapSource)}
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                    >
                      Hapus Mapserver & Metadata
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {mapSourceToDelete?.id === mapSource.id && (
              <DeleteDialog
                name={mapSourceToDelete.name}
                isDeleting={deleteMutation.isPending}
                onDelete={() => deleteMutation.mutate(mapSourceToDelete.id)}
                onCancel={() => setMapSourceToDelete(null)}
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
