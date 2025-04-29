import { mapsets } from "./mapsets";

export const groupedByOrganisasi = mapsets.reduce((acc, mapset) => {
  const organisasiName = mapset.organisasi?.name || "Unknown Organisasi";
  if (!acc[organisasiName]) {
    acc[organisasiName] = [];
  }
  acc[organisasiName].push(mapset);
  return acc;
}, {} as Record<string, typeof mapsets>);
