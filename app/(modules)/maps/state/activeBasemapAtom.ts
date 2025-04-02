import { atom } from "jotai";

type BasemapType = "osm" | "satellite" | "terrain" | "dark" | "light";
export const activeBasemapAtom = atom<BasemapType>("osm");
