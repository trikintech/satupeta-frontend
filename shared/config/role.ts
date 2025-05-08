import { Role } from "../types/role";

export interface RolePermission {
  id: string;
  permissions: Permission[];
  label: string;
}

export type Permission = "create" | "read" | "update" | "delete" | "verify";

export const roles: Record<string, RolePermission> = {
  administrator: {
    id: "administrator",
    permissions: ["create", "read", "update", "delete", "verify"],
    label: "Administrator",
  },
  data_validator: {
    id: "data_validator",
    permissions: ["create", "read", "update", "delete", "verify"],
    label: "Walidata",
  },
  data_manager: {
    id: "data_manager",
    permissions: ["create", "read", "update", "delete"],
    label: "Pengelola",
  },
  data_viewer: {
    id: "data_viewer",
    permissions: ["read"],
    label: "Viewer",
  },
};

export function hasPermission(role: Role, permission: Permission): boolean {
  const rolePermission = roles[role.name];
  return rolePermission?.permissions.includes(permission) || false;
}
