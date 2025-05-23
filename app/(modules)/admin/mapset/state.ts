import { atom } from "jotai";

export enum MapsetFormTab {
  INFO = 0,
  METADATA = 1,
  CLASSIFICATION = 2,
  VERSION = 3,
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
    is_popular: boolean;
  };
  metadata: {
    source_id: string | null;
    layer_url: string;
    metadata_source_id: string | null;
    metadata_url: string;
  };
  classification: {
    coverage_level: string;
    coverage_area: string;
  };
  version: {
    data_update_period: string;
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
    is_popular: false,
  },
  metadata: {
    source_id: "",
    layer_url: "",
    metadata_source_id: "",
    metadata_url: "",
  },
  classification: {
    coverage_level: "",
    coverage_area: "",
  },
  version: {
    data_update_period: "",
    data_version: "",
  },
};

const mapsetFormAtom = atom<MapsetFormState>(initialFormState);

export { activeTabAtom, mapsetFormAtom, initialFormState };
