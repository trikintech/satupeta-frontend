"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import organizationApi from "@/shared/services/organization";
import { OrganizationForm } from "../../_components/form";
import { useOrganizationForm } from "../../_hooks/use-organization-form";

export default function OrganizationEditPageClient() {
  const params = useParams();
  const id = params.id as string;

  const { data: organization, isLoading } = useQuery({
    queryKey: ["organization", id],
    queryFn: () => organizationApi.getOrganizationById(id),
  });

  const { handleSubmitOrganization, resetForm, isSubmitting } =
    useOrganizationForm(organization);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <OrganizationForm
        defaultValues={organization}
        onSubmitAction={handleSubmitOrganization}
        isSubmitting={isSubmitting}
        onCancelAction={resetForm}
      />
    </div>
  );
}
