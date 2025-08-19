"use client";

import userApi from "@/shared/services/user";
import { User } from "@/shared/types/user";
import { UserFormValues } from "@/shared/schemas/user";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { toast } from "sonner";
import { queryClient } from "@/shared/utils/query-client";
import { getChangedFields } from "@/shared/utils/form";
import { AxiosError } from "axios";

export function useUserForm(defaultValues?: Partial<User>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!defaultValues?.id;

  const handleSubmitUser = async (data: UserFormValues) => {
    try {
      setIsSubmitting(true);
      
      if (isEdit) {
        const changedFields = getChangedFields(defaultValues || {}, data);

        if (Object.keys(changedFields).length === 0) {
          toast.info("Tidak ada perubahan untuk disimpan");
          return;
        }

        await userApi.updateUser(defaultValues.id!, changedFields);
        toast.success("User berhasil diperbarui");
      } else {
        await userApi.createUser(data);
        toast.success("User berhasil ditambahkan");
      }
      router.push("/admin/user");
      router.refresh();
      queryClient.invalidateQueries();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 400 && error.response?.data?.detail === "Username already exists") {
        toast.error("Username sudah digunakan");
        return;
      }
      
      toast.error(isEdit ? "Gagal memperbarui user" : "Gagal menambahkan user");
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
    handleSubmitUser,
    resetForm,
    isSubmitting,
  };
}
