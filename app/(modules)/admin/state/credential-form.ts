import { Credential } from "@/shared/types/credential";

import { atomWithStorage } from "jotai/utils";

const initialFormState: Credential = {
  id: "",
    name: "",
    description: "",
    credential_type: "",
    credential_metadata: {
      environment: "",
      version: ""
    },
    is_default: false,
    is_active: false,
    created_by: "",
    updated_by: "",
    created_at: "",
    updated_at: "",
    last_used_at: "",
    last_used_by: "",
};

const credentialFormAtom = atomWithStorage<Credential>("credentialForm", initialFormState);

export { credentialFormAtom, initialFormState };
