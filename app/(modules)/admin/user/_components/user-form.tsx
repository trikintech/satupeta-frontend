// components/user-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Skema validasi untuk form user
const userSchema = z.object({
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

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  initialData: Partial<UserFormValues> & { id?: string };
  onSubmit: (data: UserFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  roles: SelectOption[];
  organizations: SelectOption[];
}

interface SelectOption {
  id: string;
  name: string;
}

export const UserForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  roles,
  organizations,
}: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialData.name || "",
      email: initialData.email || "",
      username: initialData.username || "",
      password: "",
      position: initialData.position || "",
      employee_id: initialData.employee_id || "",
      role_id: initialData.role_id || "",
      organization_id: initialData.organization_id || "",
      is_active: initialData.is_active || true,
    },
  });

  const handleFormSubmit = (data: UserFormValues) => {
    // Remove password field if it's empty (for edit mode)
    const submitData = { ...data };
    if (!submitData.password) {
      delete submitData.password;
    }
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
      {/* Name */}
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium">
          Nama Lengkap<span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan nama lengkap"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan alamat email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Username */}
      <div className="space-y-1">
        <label htmlFor="username" className="text-sm font-medium">
          Username<span className="text-red-500">*</span>
        </label>
        <input
          id="username"
          type="text"
          {...register("username")}
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan username"
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      {/* Password - Only required for new users */}
      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password{!initialData.id && <span className="text-red-500">*</span>}
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="w-full p-2 border rounded-md"
          placeholder={
            initialData.id
              ? "Kosongkan jika tidak ingin mengubah"
              : "Masukkan password (min 8 karakter)"
          }
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Position */}
      <div className="space-y-1">
        <label htmlFor="position" className="text-sm font-medium">
          Posisi/Jabatan<span className="text-red-500">*</span>
        </label>
        <input
          id="position"
          type="text"
          {...register("position")}
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan posisi/jabatan"
        />
        {errors.position && (
          <p className="text-sm text-red-500">{errors.position.message}</p>
        )}
      </div>

      {/* Employee ID */}
      <div className="space-y-1">
        <label htmlFor="employee_id" className="text-sm font-medium">
          NIP<span className="text-red-500">*</span>
        </label>
        <input
          id="employee_id"
          type="text"
          {...register("employee_id")}
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan NIP"
        />
        {errors.employee_id && (
          <p className="text-sm text-red-500">{errors.employee_id.message}</p>
        )}
      </div>

      {/* Role */}
      <div className="space-y-1">
        <label htmlFor="role" className="text-sm font-medium">
          Role<span className="text-red-500">*</span>
        </label>
        <select
          id="role"
          {...register("role_id")}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Pilih role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.role_id && (
          <p className="text-sm text-red-500">{errors.role_id.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="organization_id" className="text-sm font-medium">
          Nama Organisasi<span className="text-red-500">*</span>
        </label>
        <select
          id="organization_id"
          {...register("organization_id")}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Pilih organisasi</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
        {errors.organization_id && (
          <p className="text-sm text-red-500">
            {errors.organization_id.message}
          </p>
        )}
      </div>

      {/* Active Status */}
      <div className="space-y-1 flex items-center">
        <input
          id="is_active"
          type="checkbox"
          {...register("is_active")}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="is_active" className="ml-2 text-sm font-medium">
          Akun Aktif
        </label>
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2 align-[-0.125em]"></span>
              Menyimpan...
            </>
          ) : (
            "Simpan"
          )}
        </button>
      </div>
    </form>
  );
};
