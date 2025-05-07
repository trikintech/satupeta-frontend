// components/mapset-info-form.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

// Skema validasi
const mapsetInfoSchema = z.object({
  name: z.string().min(3, "Judul mapset minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi terlalu pendek"),
  scale: z.string().min(1, "Skala harus diisi"),
  projection_system_id: z.string().min(1, "Sistem proyeksi harus dipilih"),
  category_id: z.string().min(1, "Kategori harus dipilih"),
  classification_id: z.string().min(1, "Klasifikasi harus dipilih"),
  organization_id: z.string().min(1, "Organisasi harus dipilih"),
  data_status: z.enum(["sementara", "tetap"], {
    required_error: "Status data harus dipilih",
  }),
});

type MapsetInfoFormValues = z.infer<typeof mapsetInfoSchema>;

interface SelectOption {
  id: string;
  name: string;
}

interface MapsetInfoFormProps {
  initialData: Partial<MapsetInfoFormValues>;
  projectionSystems: SelectOption[];
  categories: SelectOption[];
  classifications: SelectOption[];
  organizations: SelectOption[];
  onSubmit: (data: MapsetInfoFormValues) => void;
}

export const MapsetInfoForm = ({
  initialData,
  projectionSystems,
  categories,
  classifications,
  organizations,
  onSubmit,
}: MapsetInfoFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MapsetInfoFormValues>({
    resolver: zodResolver(mapsetInfoSchema),
    defaultValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      scale: initialData.scale || "",
      projection_system_id: initialData.projection_system_id || "",
      category_id: initialData.category_id || "",
      classification_id: initialData.classification_id || "",
      organization_id: initialData.organization_id || "",
      data_status:
        (initialData.data_status as "sementara" | "tetap") || "sementara",
    },
  });

  // Reset form jika initialData berubah
  useEffect(() => {
    reset({
      name: initialData.name || "",
      description: initialData.description || "",
      scale: initialData.scale || "",
      projection_system_id: initialData.projection_system_id || "",
      category_id: initialData.category_id || "",
      classification_id: initialData.classification_id || "",
      organization_id: initialData.organization_id || "",
      data_status:
        (initialData.data_status as "sementara" | "tetap") || "sementara",
    });
  }, [initialData, reset]);

  const handleFormSubmit = (data: MapsetInfoFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
      {/* Judul Mapset */}
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium">
          Judul Mapset<span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          {...register("name")}
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan judul mapset yang jelas dan deskriptif"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Deskripsi */}
      <div className="space-y-1">
        <label htmlFor="description" className="text-sm font-medium">
          Deskripsi<span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full p-2 border rounded-md min-h-[100px]"
          placeholder="Tuliskan penjelasan lengkap mengenai isi dan tujuan mapset."
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Skala */}
      <div className="space-y-1">
        <label htmlFor="scale" className="text-sm font-medium">
          Skala<span className="text-red-500">*</span>
        </label>
        <input
          id="scale"
          {...register("scale")}
          className="w-full p-2 border rounded-md"
          placeholder="Contoh: 1:25.000 - sesuaikan dengan skala peta yang digunakan."
        />
        {errors.scale && (
          <p className="text-sm text-red-500">{errors.scale.message}</p>
        )}
      </div>

      {/* Sistem Proyeksi */}
      <div className="space-y-1">
        <label htmlFor="projection_system_id" className="text-sm font-medium">
          Sistem Proyeksi<span className="text-red-500">*</span>
        </label>
        <select
          id="projection_system_id"
          {...register("projection_system_id")}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Pilih sistem proyeksi geospasial</option>
          {projectionSystems.map((system) => (
            <option key={system.id} value={system.id}>
              {system.name}
            </option>
          ))}
        </select>
        {errors.projection_system_id && (
          <p className="text-sm text-red-500">
            {errors.projection_system_id.message}
          </p>
        )}
      </div>

      {/* Kategori */}
      <div className="space-y-1">
        <label htmlFor="category_id" className="text-sm font-medium">
          Kategori<span className="text-red-500">*</span>
        </label>
        <select
          id="category_id"
          {...register("category_id")}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Pilih kategori tema data yang paling relevan</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="text-sm text-red-500">{errors.category_id.message}</p>
        )}
      </div>

      {/* Klasifikasi */}
      <div className="space-y-1">
        <label htmlFor="classification_id" className="text-sm font-medium">
          Klasifikasi<span className="text-red-500">*</span>
        </label>
        <select
          id="classification_id"
          {...register("classification_id")}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Tentukan tingkat kerahasiaan data</option>
          {classifications.map((classification) => (
            <option key={classification.id} value={classification.id}>
              {classification.name}
            </option>
          ))}
        </select>
        {errors.classification_id && (
          <p className="text-sm text-red-500">
            {errors.classification_id.message}
          </p>
        )}
      </div>

      {/* Status Data */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Status Data<span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="status-temp"
              value="sementara"
              {...register("data_status")}
            />
            <label htmlFor="status-temp">Sementara</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="status-permanent"
              value="tetap"
              {...register("data_status")}
            />
            <label htmlFor="status-permanent">Tetap</label>
          </div>
        </div>
        {errors.data_status && (
          <p className="text-sm text-red-500">{errors.data_status.message}</p>
        )}
        <p className="text-xs text-gray-500">
          Pilih apakah data ini masih sementara atau sudah bersifat tetap.
        </p>
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
            Menyimpan...
          </>
        ) : (
          "Lanjutkan"
        )}
      </button>
    </form>
  );
};
