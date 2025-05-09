"use client";

import categoryApi from "@/shared/services/category";
import { Category } from "@/shared/types/category";
import { CategoryFormValues } from "@/shared/schemas/category";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { toast } from "sonner";
import { queryClient } from "@/shared/utils/query-client";
import { getChangedFields } from "@/shared/utils/form";

export function useCategoryForm(defaultValues?: Partial<Category>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!defaultValues?.id;

  const handleSubmitCategory = async (data: CategoryFormValues) => {
    try {
      setIsSubmitting(true);
      if (isEdit) {
        const changedFields = getChangedFields(defaultValues || {}, data);

        if (Object.keys(changedFields).length === 0) {
          toast.info("Tidak ada perubahan untuk disimpan");
          return;
        }

        await categoryApi.updateCategory(defaultValues.id!, changedFields);
        toast.success("Kategori berhasil diperbarui");
      } else {
        await categoryApi.createCategory(data);
        toast.success("Kategori berhasil ditambahkan");
      }
      router.push("/admin/category");
      router.refresh();
      queryClient.invalidateQueries();
    } catch (error) {
      toast.error(
        isEdit ? "Gagal memperbarui kategori" : "Gagal menambahkan kategori"
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
    handleSubmitCategory,
    resetForm,
    isSubmitting,
  };
}
