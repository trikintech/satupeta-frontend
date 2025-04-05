import { atom } from "jotai";

import { Mapset } from "../types/Mapset";

const isOpenMapsetDialogAtom = atom<boolean>(false);
const selectedMapsetAtom = atom<Mapset | null>(null);

export { isOpenMapsetDialogAtom, selectedMapsetAtom };
