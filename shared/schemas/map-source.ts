import { z } from "zod";

export const mapSourceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nama map server harus diisi"),
  description: z.string().optional(),
  url: z.string().optional(),
  credential_id: z.string().optional(),
  is_active: z.boolean(),
});

export type MapSourceFormValues = z.infer<typeof mapSourceSchema>;
