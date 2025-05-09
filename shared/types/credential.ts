export interface CredentialMetadata {
  environment: string;
  version: string;
}

export interface Credential {
  id: string;
  name: string;
  description: string;
  credential_type: string;
  credential_metadata: CredentialMetadata;
  is_default: boolean;
  is_active: boolean;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  last_used_at: string;
  last_used_by: string;
  decrypted_data: {
    [key: string]: string;
  };
}
