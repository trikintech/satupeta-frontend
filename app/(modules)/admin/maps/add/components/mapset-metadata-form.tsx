// components/mapset-metadata-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Skema validasi untuk form metadata
const metadataSchema = z.object({
  metadata_name: z.string().min(1, "Nama metadata harus diisi"),
  data_source: z.string().min(1, "Sumber data harus diisi"),
  map_server_id: z.string().min(1, "MapServer harus dipilih"),
  server_link: z.string().min(1, "Link MapServer harus diisi"),
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
      metadata_name: initialData.metadata_name || "",
      data_source: initialData.data_source || "",
      map_server_id: initialData.map_server_id || "",
      server_link: initialData.server_link || "",
    },
  });

  const handleFormSubmit = (data: MetadataFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
      {/* Nama Metadata */}
      <div className="space-y-1">
        <label htmlFor="metadata_name" className="text-sm font-medium">
          Nama Metadata (File Identifier)<span className="text-red-500">*</span>
        </label>
        <input
          id="metadata_name"
          type="text"
          {...register("metadata_name")}
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan nama unik atau ID untuk metadata ini"
        />
        {errors.metadata_name && (
          <p className="text-sm text-red-500">{errors.metadata_name.message}</p>
        )}
        <p className="text-xs text-gray-500">
          Masukkan nama unik atau ID untuk metadata ini.
        </p>
      </div>

      {/* Sumber Data */}
      <div className="space-y-1">
        <label htmlFor="data_source" className="text-sm font-medium">
          Sumber Data<span className="text-red-500">*</span>
        </label>
        <input
          id="data_source"
          type="text"
          {...register("data_source")}
          className="w-full p-2 border rounded-md"
          placeholder="Cantumkan sumber atau instansi penyedia data"
        />
        {errors.data_source && (
          <p className="text-sm text-red-500">{errors.data_source.message}</p>
        )}
        <p className="text-xs text-gray-500">
          Cantumkan sumber atau instansi penyedia data.
        </p>
      </div>

      {/* Pilih MapServer */}
      <div className="space-y-1">
        <label htmlFor="map_server_id" className="text-sm font-medium">
          Pilih MapServer<span className="text-red-500">*</span>
        </label>
        <select
          id="map_server_id"
          {...register("map_server_id")}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Pilih server untuk menyimpan data</option>
          {mapSources.map((server) => (
            <option key={server.id} value={server.id}>
              {server.name}
            </option>
          ))}
        </select>
        {errors.map_server_id && (
          <p className="text-sm text-red-500">{errors.map_server_id.message}</p>
        )}
        <p className="text-xs text-gray-500">
          Pilih server tempat data mapset disimpan. Pilih &quot;Lainnya&quot;
          jika tidak tersedia dalam daftar.
        </p>
      </div>

      {/* Masukan Link */}
      <div className="space-y-1">
        <label htmlFor="server_link" className="text-sm font-medium">
          Masukan Link<span className="text-red-500">*</span>
        </label>
        <input
          id="server_link"
          type="text"
          {...register("server_link")}
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan URL atau link ke server"
        />
        {errors.server_link && (
          <p className="text-sm text-red-500">{errors.server_link.message}</p>
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
