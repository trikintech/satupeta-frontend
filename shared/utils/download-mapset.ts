import { toast } from "sonner";

import { Mapset } from "../types/mapset";

export const handleDownloadGeojson = async (mapset: Mapset) => {
  if (!mapset?.layer_url) {
    toast.error("URL layer tidak tersedia");
    return;
  }

  try {
    toast.loading("Mempersiapkan download...");
    const response = await fetch(
      `/fe-api/mapset/download/geojson/${mapset.id}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message ?? "Gagal mengunduh data");
    }

    // Get the blob from the response
    const blob = await response.blob();

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${mapset.name}.geojson`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);

    toast.success("Download GeoJSON dimulai");
  } catch (error) {
    console.error("Download error:", error);
    toast.error(
      error instanceof Error ? error.message : "Gagal mengunduh data"
    );
  } finally {
    toast.dismiss();
  }
};

export const handleDownloadShp = async (mapset: Mapset) => {
  console.log(mapset);
  if (!mapset?.layer_url) {
    toast.error("URL layer tidak tersedia");
    return;
  }

  try {
    toast.loading("Mempersiapkan download...");
    const response = await fetch(`/fe-api/mapset/download/shp/${mapset.id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message ?? "Gagal mengunduh data");
    }

    // Get the blob from the response
    const blob = await response.blob();

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${mapset.name}.zip`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);

    toast.success("Download GeoJSON dimulai");
  } catch (error) {
    console.error("Download error:", error);
    toast.error(
      error instanceof Error ? error.message : "Gagal mengunduh data"
    );
  } finally {
    toast.dismiss();
  }
};

export const handleDownloadKml = async (mapset: Mapset) => {
  if (!mapset?.layer_url) {
    toast.error("URL layer tidak tersedia");
    return;
  }

  try {
    toast.loading("Mempersiapkan download...");
    const response = await fetch(`/fe-api/mapset/download/kml/${mapset.id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message ?? "Gagal mengunduh data");
    }

    // Get the blob from the response
    const blob = await response.blob();

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${mapset.name}.kml`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);

    toast.success("Download GeoJSON dimulai");
  } catch (error) {
    console.error("Download error:", error);
    toast.error(
      error instanceof Error ? error.message : "Gagal mengunduh data"
    );
  } finally {
    toast.dismiss();
  }
};
