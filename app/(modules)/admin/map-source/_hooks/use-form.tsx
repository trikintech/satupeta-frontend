"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import mapSourceApi from "@/shared/services/map-source";
import { MapSourceFormValues } from "@/shared/schemas/map-source";
import { queryClient } from "@/shared/utils/query-client";
import { MapSource } from "@/shared/types/map-source";
import { getChangedFields } from "@/shared/utils/form";

export function useMapSourceForm(defaultValues?: Partial<MapSource>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!defaultValues?.id;

  const handleSubmitMapSource = async (data: MapSourceFormValues) => {
    try {
      setIsSubmitting(true);
      if (isEdit && defaultValues?.id) {
        const changedFields = getChangedFields(defaultValues || {}, data);

        if (Object.keys(changedFields).length === 0) {
          toast.info("Tidak ada perubahan untuk disimpan");
          return;
        }

        await mapSourceApi.updateMapSource(defaultValues.id, changedFields);
        toast.success("Mapserver & Metadata berhasil diperbarui");
      } else {
        await mapSourceApi.createMapSource(data);
        toast.success("Mapserver & Metadata berhasil disimpan");
      }
      router.push("/admin/map-source");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["mapSources"] });
    } catch (error) {
      toast.error(
        isEdit
          ? "Gagal memperbarui Mapserver & Metadata"
          : "Gagal menyimpan mapSource"
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
    handleSubmitMapSource,
    resetForm,
    isSubmitting,
  };
}
