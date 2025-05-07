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
