"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SelectOption,
  UserFormValues,
  userSchema,
} from "@/shared/schemas/user";
import { FormField } from "@/shared/components/ds/form-field";
import { FormButton } from "@/shared/components/ds/form-button";

interface UserFormProps {
  initialData: Partial<UserFormValues> & { id?: string };
  onSubmitAction: (data: UserFormValues) => void;
  onCancelAction: () => void;
  isSubmitting: boolean;
  roles: SelectOption[];
  organizations: SelectOption[];
}

export function UserForm({
  initialData,
  onSubmitAction,
  onCancelAction,
  isSubmitting,
  roles,
  organizations,
}: UserFormProps) {
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
      is_active: initialData.is_active ?? true,
    },
  });

  const handleFormSubmit = (data: UserFormValues) => {
    const submitData = { ...data };
    if (!submitData.password) {
      delete submitData.password;
    }
    console.log(submitData);
    onSubmitAction(submitData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
      <FormField
        id="name"
        label="Nama Lengkap"
        registerAction={register}
        error={errors.name}
        required
        placeholder="Masukkan nama lengkap"
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        registerAction={register}
        error={errors.email}
        required
        placeholder="Masukkan alamat email"
      />

      <FormField
        id="username"
        label="Username"
        registerAction={register}
        error={errors.username}
        required
        placeholder="Masukkan username"
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        registerAction={register}
        error={errors.password}
        required={!initialData.id}
        placeholder={
          initialData.id
            ? "Kosongkan jika tidak ingin mengubah"
            : "Masukkan password (min 8 karakter)"
        }
      />

      <FormField
        id="position"
        label="Posisi/Jabatan"
        registerAction={register}
        error={errors.position}
        required
        placeholder="Masukkan posisi/jabatan"
      />

      <FormField
        id="employee_id"
        label="NIP"
        registerAction={register}
        error={errors.employee_id}
        required
        placeholder="Masukkan NIP"
      />

      <FormField
        id="role_id"
        label="Role"
        type="select"
        registerAction={register}
        error={errors.role_id}
        required
        options={roles}
        placeholder="Pilih role"
      />

      <FormField
        id="organization_id"
        label="Nama Organisasi"
        type="select"
        registerAction={register}
        error={errors.organization_id}
        required
        options={organizations}
        placeholder="Pilih organisasi"
      />

      <FormField
        id="is_active"
        label="Akun Aktif"
        type="checkbox"
        registerAction={register}
        error={errors.is_active}
      >
        <label htmlFor="is_active" className="ml-2 text-sm font-medium">
          Akun Aktif
        </label>
      </FormField>

      <div className="flex space-x-4 pt-4">
        <FormButton
          type="button"
          onClick={onCancelAction}
          disabled={isSubmitting}
          variant="secondary"
        >
          Batal
        </FormButton>

        <FormButton type="submit" isSubmitting={isSubmitting}>
          Simpan
        </FormButton>
      </div>
    </form>
  );
}
