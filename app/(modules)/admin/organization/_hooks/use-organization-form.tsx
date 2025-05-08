"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import organizationApi from "@/shared/services/organization";
import { OrganizationFormValues } from "@/shared/schemas/organization";
import { queryClient } from "@/shared/utils/query-client";
import { Organization } from "@/shared/types/organization";

export function useOrganizationForm(defaultValues?: Partial<Organization>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!defaultValues?.id;

  const handleSubmitOrganization = async (data: OrganizationFormValues) => {
    try {
      setIsSubmitting(true);
      if (isEdit && defaultValues?.id) {
        await organizationApi.updateOrganization(defaultValues.id, data);
        toast.success("Perangkat daerah berhasil diperbarui");
      } else {
        await organizationApi.createOrganization(data);
        toast.success("Perangkat daerah berhasil disimpan");
      }
      router.push("/admin/organization");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    } catch (error) {
      toast.error(
        isEdit
          ? "Gagal memperbarui perangkat daerah"
          : "Gagal menyimpan organization"
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
    handleSubmitOrganization,
    resetForm,
    isSubmitting,
  };
}
