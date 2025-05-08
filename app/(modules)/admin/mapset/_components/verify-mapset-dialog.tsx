"use client";

import { Button } from "@/shared/components/ds/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Mapset } from "@/shared/types/mapset";

type VerificationAction = "approve" | "reject";

interface VerifyMapsetDialogProps {
  mapset: Mapset;
  isLoading: boolean;
  onAction: (action: VerificationAction) => void;
  onCancel: () => void;
  open: boolean;
}

export const VerifyMapsetDialog = ({
  mapset,
  isLoading,
  onAction,
  onCancel,
  open,
}: VerifyMapsetDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verifikasi Mapset</DialogTitle>
          <DialogDescription>
            Verifikasi mapset &quot;{mapset.name}&quot;. Pilih untuk menyetujui
            atau menolak mapset ini.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={() => onAction("reject")}
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Tolak"}
          </Button>
          <Button
            variant="primary"
            onClick={() => onAction("approve")}
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Setujui"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
