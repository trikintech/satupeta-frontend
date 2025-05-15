"use client";

import newsApi from "@/shared/services/news";
import { News } from "@/shared/types/news";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { queryClient } from "@/shared/utils/query-client";
import { getChangedFields } from "@/shared/utils/form";
import { NewsFormValues } from "@/shared/schemas/news";

export function useNewsForm(defaultValues?: Partial<News>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!defaultValues?.id;

  const handleSubmitNews = async (data: NewsFormValues) => {
    try {
      setIsSubmitting(true);
      if (isEdit) {
        const changedFields = getChangedFields(defaultValues || {}, data);

        if (Object.keys(changedFields).length === 0) {
          toast.info("Tidak ada perubahan untuk disimpan");
          return;
        }

        await newsApi.updateNews(defaultValues.id!, changedFields);
        toast.success("Konten berhasil diperbarui");
      } else {
        await newsApi.createNews(data);
        toast.success("Konten berhasil ditambahkan");
      }

      router.push("/admin/news");
      router.refresh();
      queryClient.invalidateQueries();
    } catch (error) {
      toast.error(
        isEdit ? "Gagal memperbarui konten" : "Gagal menambahkan konten"
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    router.back();
  };

  return {
    isLoading: false,
    handleSubmitNews,
    resetForm,
    isSubmitting,
  };
}
