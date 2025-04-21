"use client";

import { SuccessDialog } from "../components/ds/success-dialog";
import { useSuccessDialog } from "../hooks/use-success-dialog";

export function GlobalDialogProvider() {
  const { isOpen, hideDialog, dialogConfig } = useSuccessDialog();

  const handleConfirm = async () => {
    try {
      // Await in case it's a promise
      await dialogConfig.onConfirm?.();
    } finally {
      // Always close the dialog
      hideDialog();
    }
  };

  const handleCancel = async () => {
    try {
      await dialogConfig.onCancel?.();
    } finally {
      hideDialog();
    }
  };

  return (
    <SuccessDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) hideDialog();
      }}
      title={dialogConfig.title}
      description={dialogConfig.description}
      confirmText={dialogConfig.confirmText}
      cancelText={dialogConfig.cancelText}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}
