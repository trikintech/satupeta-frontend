"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import mapsetApi from "@/shared/services/mapset";
import { MapsetStatus } from "./mapset-status";
import { Button } from "@/shared/components/ds/button";
import { Check } from "lucide-react";
import MapsetInfoSection from "./mapset-info-section";
import MapsetOrganizationSection from "./mapset-organization-section";
import MapsetMetadataSection from "./mapset-metadata-section";
import MapsetVersionSection from "./mapset-version-section";
import { hasPermission } from "@/shared/config/role";
import { useState } from "react";
import { toast } from "sonner";
import { VerifyMapsetDialog } from "../verify-mapset-dialog";
import { useAuthSession } from "@/shared/hooks/use-session";
import MapsetClassificationSection from "./mapset-classification-section";

interface MapsetDetailProps {
  id: string;
}

export function MapsetDetail({ id }: MapsetDetailProps) {
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: mapset } = useQuery({
    queryKey: ["mapset", id],
    queryFn: () => mapsetApi.getMapsetById(id),
  });

  const { session } = useAuthSession();
  const userRole = session?.user.role;

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
    userRole &&
    hasPermission(userRole, "mapset", "verify");
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mapset Detail</h1>
        <div className="text-sm text-gray-500">
          Diperbarui {mapset.updated_at}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <MapsetStatus mapset={mapset} />
        <div className="border-l h-6 border-gray-200" />
        {canVerify && (
          <Button variant="primary" onClick={handleVerifyClick}>
            <Check className="w-5 h-5 mr-2" /> Validasi Mapset
          </Button>
        )}

        <div className="ml-auto flex justify-between items-center">
          {mapset.is_popular && (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md">
              Mapset Populer
            </div>
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
    </div>
  );
}
