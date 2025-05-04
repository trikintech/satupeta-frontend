import { atom } from "jotai";

export type tabType = "category" | "organization";
export const activeTabAtom = atom<tabType>("category");
