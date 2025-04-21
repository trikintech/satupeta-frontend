import { atom } from "jotai";

export type DialogConfig = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
};

export const dialogAtom = atom<DialogConfig>({
  isOpen: false,
  title: "Success!",
  description: "Operation completed successfully.",
  confirmText: "OK",
  cancelText: undefined,
  onConfirm: undefined,
  onCancel: undefined,
});

// Add a derived atom for cleaner state updates
export const closeDialogAtom = atom(null, (get, set) => {
  set(dialogAtom, {
    ...get(dialogAtom),
    isOpen: false,
  });
});
