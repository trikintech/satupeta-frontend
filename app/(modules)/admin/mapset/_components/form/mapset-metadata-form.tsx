// components/mapset-metadata-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Skema validasi untuk form metadata
const metadataSchema = z.object({
  source_id: z.string().min(1, "MapServer harus dipilih"),
  layer_url: z.string().min(1, "Link MapServer harus diisi"),
});

type MetadataFormValues = z.infer<typeof metadataSchema>;

interface SelectOption {
  id: string;
  name: string;
}

interface MapsetMetadataFormProps {
  initialData: Partial<MetadataFormValues>;
  mapSources: SelectOption[];
  onSubmit: (data: MetadataFormValues) => void;
  onPrevious: () => void;
}

export const MapsetMetadataForm = ({
  initialData,
  mapSources,
  onSubmit,
  onPrevious,
}: MapsetMetadataFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MetadataFormValues>({
    resolver: zodResolver(metadataSchema),
    defaultValues: {
      source_id: initialData.source_id || "",
      layer_url: initialData.layer_url || "",
    },
  });

  const handleFormSubmit = (data: MetadataFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
      {/* Pilih MapServer */}
      <div className="space-y-1">
        <label htmlFor="source_id" className="text-sm font-medium">
          Pilih MapServer<span className="text-red-500">*</span>
        </label>
        <select
          id="source_id"
          {...register("source_id")}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Pilih server untuk menyimpan data</option>
          {mapSources.map((server) => (
            <option key={server.id} value={server.id}>
              {server.name}
            </option>
          ))}
        </select>
        {errors.source_id && (
          <p className="text-sm text-red-500">{errors.source_id.message}</p>
        )}
        <p className="text-xs text-gray-500">
          Pilih server tempat data mapset disimpan. Pilih &quot;Lainnya&quot;
          jika tidak tersedia dalam daftar.
        </p>
      </div>

      {/* Masukan Link */}
      <div className="space-y-1">
        <label htmlFor="layer_url" className="text-sm font-medium">
          Masukan Link<span className="text-red-500">*</span>
        </label>
        <input
          id="layer_url"
          type="text"
          {...register("layer_url")}
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan URL atau link ke server"
        />
        {errors.layer_url && (
          <p className="text-sm text-red-500">{errors.layer_url.message}</p>
        )}
        <p className="text-xs text-gray-500">
          Masukan link MapServer yang akan Anda tampilkan.
        </p>
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
