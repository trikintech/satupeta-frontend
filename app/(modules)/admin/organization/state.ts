import { OrganizationFormValues } from "@/shared/schemas/organization";

import { atom } from "jotai";

const initialFormState: OrganizationFormValues = {
  name: "",
  description: "",
  thumbnail: "",
  address: "",
  phone_number: "",
  email: "",
  website: "",
  is_active: true,
};

const organizationFormAtom = atom<OrganizationFormValues>(initialFormState);

export { organizationFormAtom, initialFormState };
