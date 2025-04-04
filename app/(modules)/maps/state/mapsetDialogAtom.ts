import { atom } from "jotai";

import { Mapset } from "../types/mapset.types";

const isOpenMapsetDialogAtom = atom<boolean>(false);
const activeDetailMapset = atom<Mapset | null>(null);

export { isOpenMapsetDialogAtom, activeDetailMapset };
