"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OrganizationFormValues,
  organizationSchema,
} from "@/shared/schemas/organization";
import { FormField } from "@/shared/components/ds/form-field";
import { FormButton } from "@/shared/components/ds/form-button";
import { useEffect } from "react";

interface OrganizationFormProps {
  initialData?: Partial<OrganizationFormValues> & { id?: string };
  onSubmitAction: (data: OrganizationFormValues) => void;
  onCancelAction: () => void;
  isSubmitting: boolean;
}

export function OrganizationForm({
  initialData,
  onSubmitAction,
  onCancelAction,
  isSubmitting,
}: OrganizationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      thumbnail: initialData?.thumbnail ?? "",
      address: initialData?.address ?? "",
      phone_number: initialData?.phone_number ?? "",
      email: initialData?.email ?? "",
      website: initialData?.website ?? "",
      is_active: initialData?.is_active ?? true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name ?? "",
        description: initialData.description ?? "",
        thumbnail: initialData.thumbnail ?? "",
        address: initialData.address ?? "",
        phone_number: initialData.phone_number ?? "",
        email: initialData.email ?? "",
        website: initialData.website ?? "",
        is_active: initialData.is_active ?? true,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: OrganizationFormValues) => {
    onSubmitAction(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
      <FormField
        id="name"
        label="Nama Organisasi"
        registerAction={register}
        error={errors.name}
        required
        placeholder="Masukkan nama organisasi"
      />

      <FormField
        id="description"
        label="Deskripsi"
        registerAction={register}
        error={errors.description}
        placeholder="Masukkan deskripsi organisasi"
      />

      <FormField
        id="thumbnail"
        label="Thumbnail URL"
        registerAction={register}
        error={errors.thumbnail}
        placeholder="Masukkan URL thumbnail"
      />

      <FormField
        id="address"
        label="Alamat"
        registerAction={register}
        error={errors.address}
        placeholder="Masukkan alamat organisasi"
      />

      <FormField
        id="phone_number"
        label="Nomor Telepon"
        registerAction={register}
        error={errors.phone_number}
        placeholder="Masukkan nomor telepon"
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        registerAction={register}
        error={errors.email}
        placeholder="Masukkan alamat email"
      />

      <FormField
        id="website"
        label="Website"
        registerAction={register}
        error={errors.website}
        placeholder="Masukkan URL website"
      />

      <FormField
        id="is_active"
        label="Status Aktif"
        type="checkbox"
        registerAction={register}
        error={errors.is_active}
      >
        <label htmlFor="is_active" className="ml-2 text-sm font-medium">
          Aktif
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
