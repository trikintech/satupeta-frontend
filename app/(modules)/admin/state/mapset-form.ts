// store/mapset-form.ts
import { atom } from "jotai";

// Interface untuk data form Mapset
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
  // Tab 2: Informasi Organisasi
  organization: {
    organization_id: "";
    phone_number: "";
  };
  // Tab 3: Metadata
  // metadata: {
  //   // properti sesuai kebutuhan
  // };
  // // Tab 4: Klasifikasi Wilayah
  // classification: {
  //   // properti sesuai kebutuhan
  // };
  // // Tab 5: Informasi Versi
  // version: {
  //   // properti sesuai kebutuhan
  // };
}

// Default state
const defaultMapsetFormData: MapsetFormData = {
  info: {
    name: "",
    description: "",
    scale: "",
    projection_system_id: "",
    category_id: "",
    classification_id: "",
    data_status: "Sementara",
    is_popular: false,
  },
  organization: {
    organization_id: "",
    phone_number: "",
  },
  // metadata: {},
  // classification: {},
  // version: {},
};

// Atom untuk menyimpan data form
export const mapsetFormAtom = atom<MapsetFormData>(defaultMapsetFormData);

// Atom untuk menyimpan active tab
export const activeTabAtom = atom<number>(0);
