import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface MapsetFormData {
  // Tab 1: Informasi Mapset
  info: {
    name: string;
    description: string;
    scale: string;
    projection_system_id: string;
    category_id: string;
    classification_id: string;
    data_status: "Sementara" | "Tetap";
    is_popular: boolean;
  };
}
export enum MapsetFormTab {
  INFO = 0,
  METADATA = 1,
  VERSION = 2,
}

export interface MapsetFormState {
  info: {
    name: string;
    description: string;
    scale: string;
    projection_system_id: string;
    category_id: string;
    data_status: "sementara" | "tetap";
    classification_id: string;
    organization_id: string;
  };
  metadata: {
    source_id: string;
    layer_url: string;
  };
  version: {
    update_period: string;
    data_version: string;
  };
}

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
    organization_id: "",
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

export { activeTabAtom, mapsetFormAtom, initialFormState };
