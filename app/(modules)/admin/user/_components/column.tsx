"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";
import { Badge } from "@/shared/components/ds/badge";
import { toast } from "sonner";
import { useAuthSession } from "@/shared/hooks/use-session";
import { getRoleLabelById, hasPermission } from "@/shared/config/role";
import { DeleteDialog } from "../../_components/delete-dialog";
import { User } from "@/shared/types/user";
import userApi from "@/shared/services/user";
export const useUserColumns = (): ColumnDef<User>[] => {
  const router = useRouter();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const queryClient = useQueryClient();
  const { session } = useAuthSession();
  const userRole = session?.user?.role;

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await userApi.deleteUser(id);
    },
    onSuccess: () => {
      toast.success("Berhasil menghapus user");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setUserToDelete(null);
    },
    onError: (error) => {
      toast.error("Gagal menghapus user");
      console.error("Error deleting user:", error);
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
      {column.getIsSorted() === "asc" ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "desc" ? (
        <ChevronDown className="ml-2 h-4 w-4" />
      ) : (
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );

  const baseColumns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      id: "name",
      header: ({ column }) => renderSortableHeader(column, "Nama"),
      enableSorting: true,
    },
    {
      accessorKey: "email",
      id: "email",
      header: ({ column }) => renderSortableHeader(column, "Email"),
      enableSorting: true,
    },
    {
      accessorKey: "position",
      id: "position",
      header: "Jabatan",
      enableSorting: false,
    },
    {
      accessorKey: "organization.name",
      id: "organization",
      header: "Organisasi",
      cell: ({ row }) => <div>{row.original.organization?.name}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "role.name",
      id: "role",
      header: "Role",
      cell: ({ row }) => {
        const label = getRoleLabelById(row.original.role?.name);
        return (
          <Badge variant="outline" className="capitalize">
            {label ?? "-"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "is_active",
      id: "is_active",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.is_active ? "success" : "secondary"}>
          {row.original.is_active ? "Aktif" : "Tidak Aktif"}
        </Badge>
      ),
      enableSorting: false,
    },
  ];

  if (
    userRole &&
    (hasPermission(userRole, "user", "read") ||
      hasPermission(userRole, "user", "update") ||
      hasPermission(userRole, "user", "delete"))
  ) {
    baseColumns.push({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

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
                {hasPermission(userRole, "user", "read") && (
                  <DropdownMenuItem
                    onClick={() => router.push(`/admin/user/detail/${user.id}`)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Lihat Detail
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "user", "update") && (
                  <DropdownMenuItem
                    onClick={() => router.push(`/admin/user/edit/${user.id}`)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit User
                  </DropdownMenuItem>
                )}
                {hasPermission(userRole, "user", "delete") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setUserToDelete(user)}
                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                      Hapus User
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {userToDelete?.id === user.id && (
              <DeleteDialog
                name={userToDelete.name}
                isDeleting={deleteMutation.isPending}
                onDelete={() => deleteMutation.mutate(userToDelete.id)}
                onCancel={() => setUserToDelete(null)}
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
