import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().email("Email tidak valid"),
  username: z.string().min(1, "Username harus diisi"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .optional()
    .or(z.literal("")),
  position: z.string().min(1, "Posisi harus diisi"),
  employee_id: z.string().min(1, "ID Karyawan harus diisi"),
  role_id: z.string().min(1, "Role harus dipilih"),
  organization_id: z.string().min(1, "Organisasi harus dipilih"),
  is_active: z.boolean(),
  profile_picture: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;

export interface SelectOption {
  id: string;
  name: string;
}
