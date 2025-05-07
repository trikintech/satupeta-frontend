export const ADMIN_ROLES = [
  "administrator",
  "data_validator",
  "data_manager",
] as const;

export const hasAdminAccess = (role?: string): boolean => {
  return ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number]);
};
