// components/mapset-version-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Skema validasi untuk form informasi versi
const versionSchema = z.object({
  data_update_period: z.string().min(1, "Periode update data harus diisi"),
  data_version: z.string().min(1, "Edisi/Versi data harus diisi"),
});

type VersionFormValues = z.infer<typeof versionSchema>;

interface MapsetVersionFormProps {
  initialData: Partial<VersionFormValues>;
  onSubmit: (data: VersionFormValues) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

export const MapsetVersionForm = ({
  initialData,
  onSubmit,
  onPrevious,
  isSubmitting,
}: MapsetVersionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VersionFormValues>({
    resolver: zodResolver(versionSchema),
    defaultValues: {
      data_update_period: initialData.data_update_period || "",
      data_version: initialData.data_version || "",
    },
  });

  const handleFormSubmit = (data: VersionFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
      {/* Periode Update Data */}
      <div className="space-y-1">
        <label htmlFor="data_update_period" className="text-sm font-medium">
          Periode Update Data<span className="text-red-500">*</span>
        </label>
        <input
          id="data_update_period"
          type="text"
          {...register("data_update_period")}
          className="w-full p-2 border rounded-md"
          placeholder="Triwulanan, Tahunan, atau periode tertentu lainnya"
        />
        {errors.data_update_period && (
          <p className="text-sm text-red-500">
            {errors.data_update_period.message}
          </p>
        )}
        <p className="text-xs text-gray-500">
          Contoh: Triwulanan, Tahunan, atau periode tertentu lainnya.
        </p>
      </div>

      {/* Edisi/Versi Data */}
      <div className="space-y-1">
        <label htmlFor="data_version" className="text-sm font-medium">
          Edisi/Versi Data<span className="text-red-500">*</span>
        </label>
        <input
          id="data_version"
          type="text"
          {...register("data_version")}
          className="w-full p-2 border rounded-md"
          placeholder="Tuliskan versi atau edisi data"
        />
        {errors.data_version && (
          <p className="text-sm text-red-500">{errors.data_version.message}</p>
        )}
        <p className="text-xs text-gray-500">Tuliskan versi atau edisi data.</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4 pt-4">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isSubmitting}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
        >
          Kembali
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-green-300"
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
