import { Mapset } from "../types/mapset";

export async function getMapsets(): Promise<Mapset[]> {
  const res = await fetch("/api/mapsets");
  if (!res.ok) throw new Error("Failed to fetch mapsets");
  return res.json();
}

export async function createMapset(data: Omit<Mapset, "id">): Promise<Mapset> {
  const res = await fetch("/api/mapsets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create mapset");
  return res.json();
}
