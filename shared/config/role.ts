import { Role } from "../types/role";

export type Permission = "create" | "read" | "update" | "delete" | "verify";

export interface MenuPermission {
  menu: string;
  permissions: Permission[];
}

export interface RolePermission {
  id: string;
  label: string;
  menus: MenuPermission[];
}

export const roles: Record<string, RolePermission> = {
  administrator: {
    id: "administrator",
    label: "Administrator",
    menus: [
      {
        menu: "credential",
        permissions: ["create", "read", "update", "delete", "verify"],
      },
      { menu: "category", permissions: ["create", "read", "update", "delete"] },
      { menu: "user", permissions: ["create", "read", "update", "delete"] },
      {
        menu: "organization",
        permissions: ["create", "read", "update", "delete"],
      },
    ],
  },
  data_validator: {
    id: "data_validator",
    label: "Walidata",
    menus: [
      {
        menu: "mapset",
        permissions: ["create", "read", "update", "delete", "verify"],
      },
      {
        menu: "news",
        permissions: ["create", "read", "update", "delete", "verify"],
      },
      {
        menu: "user",
        permissions: ["create", "read", "update", "delete", "verify"],
      },
    ],
  },
  data_manager: {
    id: "data_manager",
    label: "Pengelola",
    menus: [
      {
        menu: "mapset",
        permissions: ["create", "read", "update", "delete"],
      },
      {
        menu: "news",
        permissions: ["create", "read", "update", "delete"],
      },
    ],
  },
  data_viewer: {
    id: "data_viewer",
    label: "Viewer",
    menus: [
      {
        menu: "mapset",
        permissions: ["create", "read", "update", "delete"],
      },
      {
        menu: "news",
        permissions: ["create", "read", "update", "delete"],
      },
    ],
  },
};

export function getRoleLabelById(roleId: string): string | undefined {
  return roles[roleId]?.label;
}

export function hasPermission(
  role: Role,
  menu: string,
  permission: Permission
): boolean {
  const rolePermission = roles[role.name];
  const menuPerm = rolePermission?.menus.find((m) => m.menu === menu);
  return menuPerm?.permissions.includes(permission) || false;
}
