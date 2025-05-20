"use client";
import { useAuthSession } from "@/shared/hooks/use-session";
import { DeleteDialog } from "@/app/(modules)/admin/_components/delete-dialog";
import { formatIndonesianDate } from "@/shared/utils/date";
import mapsetApi from "@/shared/services/mapset";
import { Button } from "@/shared/components/ds/button";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import {
  Check,
  PencilLineIcon,
  DownloadIcon,
  UnlinkIcon,
  Trash2Icon,
  ChevronLeft,
} from "lucide-react";

import { useState } from "react";

import { toast } from "sonner";

import { VerifyMapsetDialog } from "../verify-mapset-dialog";

import MapsetClassificationSection from "./mapset-classification-section";
import MapsetInfoSection from "./mapset-info-section";
import MapsetMetadataSection from "./mapset-metadata-section";
import MapsetOrganizationSection from "./mapset-organization-section";
import { MapsetStatus } from "./mapset-status";
import MapsetVersionSection from "./mapset-version-section";

interface MapsetDetailProps {
  id: string;
}

export function MapsetDetail({ id }: MapsetDetailProps) {
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { checkPermission } = useAuthSession();

  const { data: mapset } = useQuery({
    queryKey: ["mapset", id],
    queryFn: () => mapsetApi.getMapsetById(id),
  });

  const updateStatusMutation = useMutation({
    mutationFn: (updateData: { status: string; notes: string }) =>
      mapsetApi.updateMapsetStatus(
        id,
        updateData.status,
        updateData.notes,
        mapset?.layer_url ?? ""
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mapset", id] });
      toast.success("Status mapset berhasil diperbarui");
      setIsVerifyDialogOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal memperbarui status mapset");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => mapsetApi.deleteMapset(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mapsets"] });
      toast.success("Mapset berhasil dihapus");
      router.push("/admin/mapset");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal menghapus mapset");
    },
  });

  const handleEdit = () => {
    router.push(`/admin/mapset/edit/${id}`);
  };

  const handleDownload = async () => {
    if (!mapset?.layer_url) {
      toast.error("URL layer tidak tersedia");
      return;
    }

    try {
      toast.loading("Mempersiapkan download...");
      const response = await fetch(`/fe-api/mapset/download/${id}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Gagal mengunduh data");
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

  const handleUnlink = () => {
    if (!mapset?.layer_url) {
      toast.error("URL layer tidak tersedia");
      return;
    }
    navigator.clipboard.writeText(mapset.layer_url);
    toast.success("URL layer berhasil disalin");
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteMutation.mutate();
  };

  if (!mapset) return null;

  const handleVerifyClick = () => {
    setIsVerifyDialogOpen(true);
  };

  const handleVerificationAction = (
    action: "approve" | "reject",
    notes: string
  ) => {
    const newStatus = action === "approve" ? "approved" : "rejected";
    updateStatusMutation.mutate({ status: newStatus, notes });
  };

  const canVerify =
    mapset?.status_validation === "on_verification" &&
    checkPermission("mapset", "verify");

  const canEdit = checkPermission("mapset", "update");
  const canDownload = checkPermission("mapset", "read");
  const canUnlink = checkPermission("mapset", "update");
  const canDelete = checkPermission("mapset", "delete");

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-8 w-8 text-zinc-700 cursor-pointer" />
          </Button>
          <h1 className="text-2xl font-bold">Mapset Detail</h1>
        </div>
        <div className="text-sm text-gray-500">
          Diperbarui {formatIndonesianDate(mapset.updated_at)}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6 text-sm">
        <MapsetStatus mapset={mapset} />
        <div className="border-l h-8 border-gray-200" />
        {canVerify && (
          <Button
            variant="primary"
            className="px-2.5 h-8 text-xs"
            onClick={handleVerifyClick}
          >
            <Check className="w-5 h-4 mr-2" /> Validasi Mapset
          </Button>
        )}

        <div className="ml-auto flex gap-2 justify-between items-center">
          {mapset.is_popular && (
            <div className="bg-green-100 text-green-700 px-3 py-2 rounded-full">
              Mapset Populer
            </div>
          )}
          <div className="border-l h-8 border-gray-200" />
          <div className="flex">
            {canEdit && (
              <button
                className="cursor-pointer w-9 h-9 flex items-center justify-center"
                onClick={handleEdit}
              >
                <PencilLineIcon className="w-4 h-4" />
              </button>
            )}
            {canDownload && (
              <button
                className="cursor-pointer w-9 h-9 flex items-center justify-center"
                onClick={handleDownload}
              >
                <DownloadIcon className="w-4 h-4" />
              </button>
            )}
            {canUnlink && (
              <button
                className="cursor-pointer w-9 h-9 flex items-center justify-center"
                onClick={handleUnlink}
              >
                <UnlinkIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          {canDelete && (
            <>
              <div className="border-l h-8 border-gray-200" />
              <button
                className="cursor-pointer w-9 h-9 flex items-center justify-center"
                onClick={handleDelete}
              >
                <Trash2Icon className="w-4 h-4 text-red-600" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <MapsetInfoSection mapset={mapset} />
          <MapsetOrganizationSection mapset={mapset} />
        </div>
        <div className="space-y-6">
          <MapsetMetadataSection mapset={mapset} />
          <MapsetClassificationSection mapset={mapset} />
          <MapsetVersionSection mapset={mapset} />
        </div>
      </div>

      {mapset && (
        <VerifyMapsetDialog
          mapset={mapset}
          isLoading={updateStatusMutation.isPending}
          onAction={handleVerificationAction}
          onCancel={() => setIsVerifyDialogOpen(false)}
          open={isVerifyDialogOpen}
        />
      )}

      <DeleteDialog
        name={mapset.name}
        isDeleting={deleteMutation.isPending}
        onDelete={handleDeleteConfirm}
        onCancel={() => setIsDeleteDialogOpen(false)}
        open={isDeleteDialogOpen}
      />
    </div>
  );
}
