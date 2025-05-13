// app/(dashboard)/manajemen-peta/components/confirmation-dialog.tsx
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

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  variant?:
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "success"
    | "primary"
    | "tertiary"
    | null;
}

export const ConfirmationDialog = ({
  open,
  title,
  description,
  confirmText = "Ya",
  cancelText = "Batal",
  isLoading = false,
  onConfirm,
  onCancel,
  variant = "primary",
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={onConfirm} disabled={isLoading}>
            {isLoading ? `${confirmText}...` : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
