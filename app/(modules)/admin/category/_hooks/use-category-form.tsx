"use client";

import categoryApi from "@/shared/services/category";
import { Category } from "@/shared/types/category";
import { CategoryFormValues } from "@/shared/schemas/category";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { toast } from "sonner";
import { queryClient } from "@/shared/utils/query-client";

const getChangedFields = (
  original: Partial<Category>,
  updated: CategoryFormValues
): Partial<CategoryFormValues> => {
  const changedFields: Partial<CategoryFormValues> = {};

  (Object.keys(updated) as Array<keyof CategoryFormValues>).forEach((key) => {
    const updatedValue = updated[key];
    const originalValue = original[key as keyof Category];

    // Handle undefined cases properly
    if (updatedValue !== originalValue) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      changedFields[key] = updatedValue as any;
    }
  });

  return changedFields;
};

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
