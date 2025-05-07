import { atom } from "jotai";

export type BasemapType = "osm" | "satellite" | "terrain" | "dark" | "light";
export const activeBasemapAtom = atom<BasemapType>("osm");
