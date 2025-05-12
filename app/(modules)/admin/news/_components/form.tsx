"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newsSchema = z.object({
  name: z.string().min(1, "Judul harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi"),
  thumbnail: z.string().optional(),
  is_active: z.boolean(),
});

export type NewsFormValues = z.infer<typeof newsSchema>;

interface NewsFormProps {
  initialData: Partial<NewsFormValues> & { id?: string };
  onSubmit: (data: NewsFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export interface News {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  is_active: boolean;
}

export const NewsForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: NewsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      thumbnail: initialData.thumbnail || "",
      is_active: initialData.is_active ?? true,
    },
  });

  const handleFormSubmit = (data: NewsFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium">
          Judul Berita<span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan judul berita"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="description" className="text-sm font-medium">
          Deskripsi<span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full p-2 border rounded-md h-32"
          placeholder="Masukkan deskripsi berita"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="thumbnail" className="text-sm font-medium">
          Thumbnail URL
        </label>
        <input
          id="thumbnail"
          type="text"
          {...register("thumbnail")}
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan URL thumbnail"
        />
        {errors.thumbnail && (
          <p className="text-sm text-red-500">{errors.thumbnail.message}</p>
        )}
      </div>

      <div className="space-y-1 flex items-center">
        <input
          id="is_active"
          type="checkbox"
          {...register("is_active")}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="is_active" className="ml-2 text-sm font-medium">
          Berita Aktif
        </label>
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-zinc-100 disabled:text-gray-400"
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
