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
import { News } from "@/shared/types/news";
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
import newsApi from "@/shared/services/news";
import { toast } from "sonner";
import { hasPermission } from "@/shared/config/role";
import { DeleteDialog } from "../../_components/delete-dialog";
import { useAuthSession } from "@/shared/hooks/use-session";

// Type for column configuration
interface ColumnConfig {
  id: string;
  header: string;
  accessor?: keyof News;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessorFn?: (row: News) => any;
  sortable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cell?: (value: any) => React.ReactNode;
}

// Default column configurations
const COLUMN_CONFIGS: ColumnConfig[] = [
  {
    id: "name",
    header: "Judul",
    accessor: "name",
    sortable: true,
  },
  {
    id: "thumbnail",
    header: "Gambar",
    accessorFn: (row) => row.thumbnail,
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

export const useNewsColumns = (): ColumnDef<News>[] => {
  const router = useRouter();
  const [newsToDelete, setNewsToDelete] = useState<News | null>(null);
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  const userRole = session?.user?.role;

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await newsApi.deleteNews(id);
    },
    onSuccess: () => {
      toast.success("Berhasil menghapus data");
      queryClient.invalidateQueries({ queryKey: ["newss"] });
      setNewsToDelete(null);
    },
    onError: (error) => {
      toast.error("Gagal menghapus data");
      console.error("Error deleting news:", error);
    },
  });

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
    const column: ColumnDef<News> = {
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

  // Add actions column if news has any permissions
  if (
    userRole &&
    (hasPermission(userRole, "read") ||
      hasPermission(userRole, "update") ||
      hasPermission(userRole, "delete"))
  ) {
    baseColumns.push({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const news = row.original;

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
                {hasPermission(userRole, "read") && (
                  <DropdownMenuItem
                    onClick={() => router.push(`/admin/news/detail/${news.id}`)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Lihat Detail
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "update") && (
                  <DropdownMenuItem
                    onClick={() => router.push(`/admin/news/edit/${news.id}`)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit News
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "delete") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setNewsToDelete(news)}
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                      Hapus News
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {newsToDelete?.id === news.id && (
              <DeleteDialog
                name={newsToDelete?.name ?? ""}
                isDeleting={deleteMutation.isPending}
                onDelete={() => deleteMutation.mutate(newsToDelete?.id ?? "")}
                onCancel={() => setNewsToDelete(null)}
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
