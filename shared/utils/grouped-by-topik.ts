import { mapsets } from "./mapsets";

export const groupedByTopik = mapsets.reduce((acc, mapset) => {
  const topikName = mapset.topik?.name || "Unknown Topik";
  if (!acc[topikName]) {
    acc[topikName] = [];
  }
  acc[topikName].push(mapset);
  return acc;
}, {} as Record<string, typeof mapsets>);
