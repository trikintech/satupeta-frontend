import { atom } from "jotai";

export type FeatureInformationType = {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: any;
};
export const featureInformationAtom = atom<FeatureInformationType[] | null>(
  null
);
