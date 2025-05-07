// components/mapset-organization-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Skema validasi untuk form organisasi
const organizationSchema = z.object({
  organization_id: z.string().min(1, "Nama organisasi harus dipilih"),
  phone_number: z.string().min(1, "Nomor telepon harus diisi"),
});

type OrganizationFormValues = z.infer<typeof organizationSchema>;

interface SelectOption {
  id: string;
  name: string;
}

interface MapsetOrganizationFormProps {
  initialData: Partial<OrganizationFormValues>;
  organizations: SelectOption[];
  onSubmit: (data: OrganizationFormValues) => void;
  onPrevious: () => void;
}

export const MapsetOrganizationForm = ({
  initialData,
  organizations,
  onSubmit,
  onPrevious,
}: MapsetOrganizationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      organization_id: initialData.organization_id || "",
      phone_number: initialData.phone_number || "",
    },
  });

  const handleFormSubmit = (data: OrganizationFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
      {/* Nama Organisasi */}
      <div className="space-y-1">
        <label htmlFor="organization_id" className="text-sm font-medium">
          Nama Organisasi<span className="text-red-500">*</span>
        </label>
        <select
          id="organization_id"
          {...register("organization_id")}
          className="w-full p-2 border rounded-md"
        >
          <option value="">
            Pilih organisasi yang berkontribusi atas data ini
          </option>
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

      {/* No Telepon Organisasi */}
      <div className="space-y-1">
        <label htmlFor="phone_number" className="text-sm font-medium">
          No Telpon Organisasi<span className="text-red-500">*</span>
        </label>
        <input
          id="phone_number"
          type="text"
          {...register("phone_number")}
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan nomor kontak resmi organisasi"
        />
        {errors.phone_number && (
          <p className="text-sm text-red-500">{errors.phone_number.message}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4 pt-4">
        <button
          type="button"
          onClick={onPrevious}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Kembali
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          Lanjutkan
        </button>
      </div>
    </form>
  );
};
