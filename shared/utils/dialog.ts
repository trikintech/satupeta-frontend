"use client";

import { useSetAtom } from "jotai";

import { dialogAtom } from "../state/dialog";

export function useDialog() {
  const setDialog = useSetAtom(dialogAtom);

  const success = (config: {
    title?: string;
    description?: string;
    onConfirm?: () => void;
    confirmText?: string;
  }) => {
    setDialog({
      isOpen: true,
      title: config.title || "Success!",
      description: config.description || "Operation completed successfully.",
      confirmText: config.confirmText || "OK",
      cancelText: undefined,
      onConfirm: config.onConfirm,
      onCancel: undefined,
    });
  };

  const confirm = (config: {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
  }) => {
    setDialog({
      isOpen: true,
      title: config.title,
      description: config.description,
      confirmText: config.confirmText || "Confirm",
      cancelText: config.cancelText || "Cancel",
      onConfirm: config.onConfirm,
      onCancel: config.onCancel,
    });
  };

  return { success, confirm };
}
