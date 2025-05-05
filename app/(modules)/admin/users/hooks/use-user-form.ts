import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import * as z from "zod";

export const formSchema = z.object({
  username: z.string().min(6, { message: "Username minimal 6 karakter" }),
  name: z.string().min(3, { message: "Nama minimal 3 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/[A-Z]/, { message: "Harus ada huruf kapital" })
    .regex(/\d/, { message: "Harus ada angka" })
    .regex(/[^A-Za-z0-9]/, { message: "Harus ada karakter spesial" })
    .optional()
    .or(z.literal("")),
  profile_picture: z.string().optional(),
  position: z.string().optional(),
  employee_id: z.string().optional(),
  organisasi_id: z.coerce.number({
    required_error: "Organisasi tidak boleh kosong",
  }),
  role_id: z.string().optional(),
  is_active: z.boolean().optional(),
});

export type UserFormData = z.infer<typeof formSchema>;

export function useUserForm(defaults: Partial<UserFormData> = {}) {
  return useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      position: "",
      email: "",
      password: "",
      employee_id: "",
      profile_picture: "",
      organisasi_id: undefined,
      role_id: "",
      is_active: true,
      ...defaults,
    },
  });
}
