import { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ds/badge";
import { Button } from "@/shared/components/ui/button";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";
import { UserResponse } from "@/shared/types/user";
import { useRouter } from "next/navigation";
import { createSortableHeader } from "../../../components/data-table";

export const getUserTableColumns =
  (onDelete: (user: UserResponse) => void) =>
  (router: ReturnType<typeof useRouter>): ColumnDef<UserResponse>[] =>
    [
      {
        accessorKey: "name",
        header: createSortableHeader("Name"),
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.profile_picture} alt={user.name} />
                <AvatarFallback>
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="font-medium">{user.name}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: createSortableHeader("Email"),
      },
      {
        accessorKey: "organisasi_name",
        header: createSortableHeader("Organization"),
      },
      {
        accessorKey: "is_active",
        header: createSortableHeader("Status Active"),
        cell: ({ row }) => {
          const isActive = row.getValue("is_active");
          return (
            <Badge variant={!isActive ? "destructive" : "success"}>
              {!isActive ? "Inactive" : "Active"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "is_deleted",
        header: createSortableHeader("Status Delete"),
        cell: ({ row }) => {
          const isDeleted = row.getValue("is_deleted");
          return isDeleted ? "Ya" : "Tidak";
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => router.push(`/admin/users/detail/${user.id}`)} // Use router here
                >
                  View details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push(`/admin/users/edit/${user.id}`)} // Use router here
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(user)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
