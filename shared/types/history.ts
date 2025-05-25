import { User } from "./user";

export interface History {
  id: string;
  mapset_id: string;
  validation_type: string;
  notes: string | null;
  timestamp: string;
  user: User;
}
