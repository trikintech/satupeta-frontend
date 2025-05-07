import { Organization } from "./organization";
import { Role } from "./role";

export interface User {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  username: string;
  position: string;
  role: Role;
  employee_id: string;
  organization: Organization;
  is_active: boolean;
}

export interface UserRequest {
  id?: string;
  name?: string;
  password?: string;
  email?: string;
  profile_picture?: string;
  username?: string;
  position?: string;
  role_id?: string;
  employee_id?: string;
  organization_id?: string;
  is_active?: boolean;
}
