import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

import { MapsetFormState, MapsetFormTab } from "./types";

const activeTabAtom = atom(MapsetFormTab.INFO);

const initialFormState: MapsetFormState = {
  info: {
    name: "",
    description: "",
    scale: "",
    projection_system_id: "",
    category_id: "",
    classification_id: "",
    data_status: "sementara",
  },
  organization: {
    organization_id: "",
    phone_number: "",
  },
  metadata: {
    source_id: "",
    layer_url: "",
  },
  version: {
    update_period: "",
    data_version: "",
  },
};

const mapsetFormAtom = atomWithStorage<MapsetFormState>(
  "mapsetForm",
  initialFormState
);

export { mapsetFormAtom, activeTabAtom, initialFormState };
