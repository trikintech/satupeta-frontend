import { Credential } from "./credential";

export interface MapSource {
  id: string;
  name: string;
  description: string;
  credential: Credential;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
