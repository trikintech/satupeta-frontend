type FeatureConfig = {
  name: string;
  isActive: boolean;
  description?: string;
};

export const featureFlags = {
  advancedMaps: {
    name: "3D Map Tools",
    isActive: false,
  },
  userManagement: {
    name: "User Management",
    isActive: true,
  },
} satisfies Record<string, FeatureConfig>;

export type FeatureKey = keyof typeof featureFlags;
