import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import * as z from "zod";

export const formSchema = z.object({
  username: z.string().min(6, { message: "Username minimal 6 karakter" }),
  name: z.string().min(3, { message: "Nama minimal 3 karakter" }),
  jabatan: z.string().optional(),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/[A-Z]/, { message: "Harus ada huruf kapital" })
    .regex(/\d/, { message: "Harus ada angka" })
    .regex(/[^A-Za-z0-9]/, { message: "Harus ada karakter spesial" })
    .optional()
    .or(z.literal("")),
  nip: z.string().optional(),
  image: z.string().optional(),
  wilayah_id: z.number({ required_error: "Wilayah tidak boleh kosong" }),
  organisasi_id: z.coerce.number({
    required_error: "Organisasi tidak boleh kosong",
    invalid_type_error: "Organisasi harus angka",
  }),
  role: z.string(),
  is_active: z.boolean().optional(),
});

export type UserFormData = z.infer<typeof formSchema>;

export function useUserForm(defaults: Partial<UserFormData> = {}) {
  return useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      jabatan: "",
      email: "",
      password: "",
      nip: "",
      image: "",
      wilayah_id: 1,
      organisasi_id: undefined,
      role: "",
      is_active: true,
      ...defaults,
    },
  });
}
