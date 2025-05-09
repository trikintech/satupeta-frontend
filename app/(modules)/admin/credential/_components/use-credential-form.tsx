"use client";

import credentialApi from "@/shared/services/credential";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { toast } from "sonner";
import { queryClient } from "@/shared/utils/query-client";
import { getChangedFields } from "@/shared/utils/form";
import { CredentialFormValues } from "../../../../../shared/schemas/credential";

export function useCredentialForm(defaultValues?: Partial<Credential>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!defaultValues?.id;

  const handleSubmitCredential = async (data: CredentialFormValues) => {
    try {
      setIsSubmitting(true);
      if (isEdit) {
        const changedFields = getChangedFields(defaultValues || {}, data);

        if (Object.keys(changedFields).length === 0) {
          toast.info("Tidak ada perubahan untuk disimpan");
          return;
        }

        await credentialApi.updateCredential(defaultValues.id!, changedFields);
        toast.success("Kredensial berhasil diperbarui");
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...dataWithoutId } = data;
        await credentialApi.createCredential(dataWithoutId);
        toast.success("Kredensial berhasil ditambahkan");
      }
      router.push("/admin/credential");
      router.refresh();
      queryClient.invalidateQueries();
    } catch (error) {
      toast.error(
        isEdit ? "Gagal memperbarui kredensial" : "Gagal menambahkan kredensial"
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
    handleSubmitCredential,
    resetForm,
    isSubmitting,
  };
}
