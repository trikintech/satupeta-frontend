import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nama organisasi harus diisi"),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  is_active: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
