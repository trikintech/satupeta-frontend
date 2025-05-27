import { Permission } from "./role";

export const adminRoutePermissions: Record<
  string,
  { menu: string; permission: Permission }
> = {
  "/admin/mapset": { menu: "mapset", permission: "read" },
  "/admin/mapset/create": { menu: "mapset", permission: "create" },
  "/admin/mapset/[id]": { menu: "mapset", permission: "read" }, // detail
  "/admin/mapset/[id]/edit": { menu: "mapset", permission: "update" },

  "/admin/news": { menu: "news", permission: "read" },
  "/admin/news/create": { menu: "news", permission: "create" },
  "/admin/news/[id]": { menu: "news", permission: "read" },
  "/admin/news/[id]/edit": { menu: "news", permission: "update" },

  "/admin/user": { menu: "user", permission: "read" },
  "/admin/user/create": { menu: "user", permission: "create" },
  "/admin/user/[id]": { menu: "user", permission: "read" },
  "/admin/user/[id]/edit": { menu: "user", permission: "update" },

  "/admin/organization": { menu: "organization", permission: "read" },
  "/admin/organization/create": { menu: "organization", permission: "create" },
  "/admin/organization/[id]": { menu: "organization", permission: "read" },
  "/admin/organization/[id]/edit": {
    menu: "organization",
    permission: "update",
  },

  "/admin/map-source": { menu: "map-source", permission: "read" },
  "/admin/map-source/create": { menu: "map-source", permission: "create" },
  "/admin/map-source/[id]": { menu: "map-source", permission: "read" },
  "/admin/map-source/[id]/edit": { menu: "map-source", permission: "update" },

  "/admin/category": { menu: "category", permission: "read" },
  "/admin/category/create": { menu: "category", permission: "create" },
  "/admin/category/[id]": { menu: "category", permission: "read" },
  "/admin/category/[id]/edit": { menu: "category", permission: "update" },

  "/admin/credential": { menu: "credential", permission: "read" },
  "/admin/credential/create": { menu: "credential", permission: "create" },
  "/admin/credential/[id]": { menu: "credential", permission: "read" },
  "/admin/credential/[id]/edit": { menu: "credential", permission: "update" },
};
