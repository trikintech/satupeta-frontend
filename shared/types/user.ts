import { Organization } from "./organization";
import { Role } from "./role";

export interface User {
  role_id: string;
  organization_id: string;
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  username: string;
  position: string;
  role: Role;
  employee_id: string;
  organization: Partial<Organization>;
  is_active: boolean;
}
