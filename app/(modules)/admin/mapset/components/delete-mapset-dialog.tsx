// app/(dashboard)/manajemen-peta/components/delete-mapset-dialog.tsx
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

interface DeleteMapsetDialogProps {
  mapset: Mapset;
  isDeleting: boolean;
  onDelete: () => void;
  onCancel: () => void;
  open: boolean;
}

export const DeleteMapsetDialog = ({
  mapset,
  isDeleting,
  onDelete,
  onCancel,
  open,
}: DeleteMapsetDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hapus Mapset</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus mapset &quot;{mapset.name}&quot;?
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
