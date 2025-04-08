import { Mapset } from "@/shared/types/mapset";

import { atom } from "jotai";

const isOpenMapsetDialogAtom = atom<boolean>(false);
const selectedMapsetAtom = atom<Mapset | null>(null);

export { isOpenMapsetDialogAtom, selectedMapsetAtom };
