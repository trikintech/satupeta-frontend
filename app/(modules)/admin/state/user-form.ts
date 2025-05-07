import { atomWithStorage } from "jotai/utils";

export interface Organization {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface UserFormState {
  name: string;
  email: string;
  username: string;
  profile_picture: string;
  employee_id: string;
  position: string;
  organization_id: string;
  role_id: string;
  is_active: boolean;
  password?: string;
}

const initialFormState: UserFormState = {
  name: "",
  email: "",
  username: "",
  profile_picture: "",
  employee_id: "",
  position: "",
  organization_id: "",
  role_id: "",
  is_active: true,
  password: "",
};

const userFormAtom = atomWithStorage<UserFormState>(
  "userForm",
  initialFormState
);

export { userFormAtom, initialFormState };
