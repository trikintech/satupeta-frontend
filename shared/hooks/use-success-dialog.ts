// hooks/use-success-dialog.ts
"use client";

import { useAtom } from "jotai";

import { closeDialogAtom, dialogAtom, DialogConfig } from "../state/dialog";

export function useSuccessDialog() {
  const [dialogState, setDialogState] = useAtom(dialogAtom);
  const [, closeDialog] = useAtom(closeDialogAtom);

  const showDialog = (config?: Partial<DialogConfig>) => {
    setDialogState({
      ...dialogState,
      isOpen: true,
      ...config,
    });
  };

  return {
    isOpen: dialogState.isOpen,
    showDialog,
    hideDialog: closeDialog, // Use the dedicated close atom
    dialogConfig: dialogState,
  };
}
