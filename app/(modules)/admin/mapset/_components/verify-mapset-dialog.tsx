import { useState } from "react";
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
  onAction: (action: VerificationAction, note: string) => void;
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
  const [note, setNote] = useState<string>("");

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

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
        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Catatan
          </label>
          <textarea
            id="notes"
            value={note}
            onChange={handleNoteChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Masukkan catatan Anda di sini..."
            rows={4}
          />
        </div>
        <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={() => onAction("reject", note)}
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Tolak"}
          </Button>
          <Button
            variant="primary"
            onClick={() => onAction("approve", note)}
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Setujui"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
