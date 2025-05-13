"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { MapSourceForm } from "../../_components/form";
import mapSourceApi from "@/shared/services/map-source";
import { useMapSourceForm } from "../../_hooks/use-form";

export default function MapSourceEditPageClient() {
  const params = useParams();
  const id = params.id as string;

  const { data: mapSource, isLoading } = useQuery({
    queryKey: ["mapSource", id],
    queryFn: () => mapSourceApi.getMapSourceById(id),
  });

  const { handleSubmitMapSource, resetForm, isSubmitting } =
    useMapSourceForm(mapSource);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <MapSourceForm
        defaultValues={mapSource}
        onSubmitAction={handleSubmitMapSource}
        isSubmitting={isSubmitting}
        onCancelAction={resetForm}
      />
    </div>
  );
}
