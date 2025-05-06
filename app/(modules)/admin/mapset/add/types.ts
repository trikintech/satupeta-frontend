export enum MapsetFormTab {
  INFO = 0,
  ORGANIZATION = 1,
  METADATA = 2,
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
  };
  organization: {
    organization_id: string;
    phone_number: string;
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
