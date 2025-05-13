import { MapSourceFormValues } from "@/shared/schemas/map-source";

import { atom } from "jotai";

const initialFormState: MapSourceFormValues = {
  name: "",
  description: "",
  credential_id: "",
  is_active: true,
};

const mapSourceFormAtom = atom<MapSourceFormValues>(initialFormState);

export { mapSourceFormAtom, initialFormState };
