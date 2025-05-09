import { z } from "zod";

export const credentialMetadataSchema = z.object({
  environment: z.string(),
  version: z.string(),
});

export const credentialSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  credential_type: z.string(),
  credential_metadata: credentialMetadataSchema,
  is_default: z.boolean(),
  is_active: z.boolean(),
  created_by: z.string(),
  updated_by: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  last_used_at: z.string(),
  last_used_by: z.string(),
  sensitive_data: z.record(z.string()),
});

export type CredentialMetadata = z.infer<typeof credentialMetadataSchema>;
export type CredentialFormValues = z.infer<typeof credentialSchema>;
