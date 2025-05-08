import { Role } from "../types/role";

export interface RolePermission {
  id: string;
  permissions: Permission[];
}

export type Permission = "create" | "read" | "update" | "delete" | "verify";

export const roles: Record<string, RolePermission> = {
  administrator: {
    id: "administrator",
    permissions: ["create", "read", "update", "delete", "verify"],
  },
  data_validator: {
    id: "data_validator",
    permissions: ["create", "read", "update", "delete", "verify"],
  },
  data_manager: {
    id: "data_manager",
    permissions: ["create", "read", "update", "delete"],
  },
  data_viewer: {
    id: "data_viewer",
    permissions: ["read"],
  },
};

export function hasPermission(role: Role, permission: Permission): boolean {
  const rolePermission = roles[role.name];
  return rolePermission?.permissions.includes(permission) || false;
}
