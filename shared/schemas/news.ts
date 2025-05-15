import { z } from "zod";

export const newsSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Judul konten harus diisi"),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  is_active: z.boolean(),
});

export type NewsFormValues = z.infer<typeof newsSchema>;
