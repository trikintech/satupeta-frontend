import mapsetApi from "@/shared/services/mapset";
import { getWmsToGeoJsonUrl } from "@/shared/utils/wms";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const mapset = await mapsetApi.getMapsetById(id);
    if (!mapset?.layer_url) {
      return NextResponse.json(
        { error: "Layer URL tidak tersedia" },
        { status: 400 }
      );
    }

    const downloadUrl = getWmsToGeoJsonUrl(mapset.layer_url);
    if (!downloadUrl) {
      return NextResponse.json(
        { error: "URL layer tidak valid" },
        { status: 400 }
      );
    }

    // Fetch the GeoJSON data
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Gagal mengambil data dari GeoServer" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Set headers for file download
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set(
      "Content-Disposition",
      `attachment; filename="${mapset.name}.geojson"`
    );

    return new NextResponse(JSON.stringify(data), {
      headers,
    });
  } catch (error) {
    console.error("Error downloading mapset:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengunduh data" },
      { status: 500 }
    );
  }
}
