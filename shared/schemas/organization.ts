import { z } from "zod";

export const organizationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nama organisasi harus diisi"),
  description: z.string().optional(),
  thumbnail: z.string().url().optional(),
  address: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.string().email("Email tidak valid").optional(),
  website: z.string().url("URL tidak valid").optional(),
  count_mapset: z.number().nonnegative().optional(),
  is_active: z.boolean(),
});

export type OrganizationFormValues = z.infer<typeof organizationSchema>;
