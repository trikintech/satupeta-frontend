import { Badge } from "@/shared/components/ds/badge";
import { Button } from "@/shared/components/ds/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
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
import { ArrowUpDown, Eye, Edit, Trash, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteMapsetDialog } from "../delete-mapset-dialog";
import mapsetApi from "@/shared/services/mapset";
import { toast } from "sonner";

export const useMapsetColumns = (): ColumnDef<Mapset>[] => {
  const router = useRouter();
  const [mapsetToDelete, setMapsetToDelete] = useState<Mapset | null>(null);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await mapsetApi.deleteMapset(id);
    },
    onSuccess: () => {
      toast.success("berhasil menghapus data");
      queryClient.invalidateQueries({ queryKey: ["mapsets"] });
      setMapsetToDelete(null);
    },
    onError: (error) => {
      toast.error("gagal menghapus data");
      console.error("Error deleting mapset:", error);
    },
  });

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Nama Mapset
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      id: "classification",
      accessorFn: (row) => row.classification?.name,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Klasifikasi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("classification")}</div>,
    },
    {
      id: "producer",
      accessorFn: (row) => row.producer?.name,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Instansi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("producer")}</div>,
    },
    {
      accessorKey: "is_active",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const is_active = row.getValue("is_active");

        return (
          <Badge variant={is_active ? "success" : "secondary"}>
            {is_active ? "Aktif" : "Tidak Aktif"}
          </Badge>
        );
      },
    },
    {
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
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/admin/mapset/detail/${mapset.id}`)
                  }
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Lihat Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/admin/mapset/edit/${mapset.id}`)}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Mapset
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setMapsetToDelete(mapset)}
                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                >
                  <Trash className="h-4 w-4" />
                  Hapus Mapset
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {mapsetToDelete && (
              <DeleteMapsetDialog
                mapset={mapsetToDelete}
                isDeleting={deleteMutation.isPending}
                onDelete={() => deleteMutation.mutate(mapsetToDelete.id)}
                onCancel={() => setMapsetToDelete(null)}
                open={mapsetToDelete.id === mapset.id}
              />
            )}
          </>
        );
      },
    },
  ];
};
