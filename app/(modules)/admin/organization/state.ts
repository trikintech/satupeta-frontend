import { OrganizationFormValues } from "@/shared/schemas/organization";

import { atomWithStorage } from "jotai/utils";

const initialFormState: OrganizationFormValues = {
  name: "",
  description: "",
  thumbnail: "",
  address: "",
  phone_number: "",
  email: "",
  website: "",
  count_mapset: 0,
  is_active: true,
};

const organizationFormAtom = atomWithStorage<OrganizationFormValues>(
  "organizationForm",
  initialFormState
);

export { organizationFormAtom, initialFormState };
