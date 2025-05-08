"use client";

import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import organizationApi from "@/shared/services/organization";
import { notFound, useParams } from "next/navigation";
import { useOrganizationForm } from "../../_hooks/use-organization-form";
import { OrganizationForm } from "../../_components/form";
import { OrganizationFormValues } from "@/shared/schemas/organization";
import PageHeader from "../../../_components/page-header";
import { useEffect } from "react";

export default function EditOrganizationPageClient() {
  const params = useParams();
  const organizationId = params.id as string;

  const {
    data: organization,
    isLoading: isLoadingOrganization,
    isError,
  } = useQuery({
    queryKey: ["organization", organizationId],
    queryFn: () => organizationApi.getOrganizationById(organizationId),
    enabled: !!organizationId,
  });

  const {
    formState,
    isLoading: isLoadingForm,
    handleSubmitOrganization,
    resetForm,
    isSubmitting,
    setInitialData,
  } = useOrganizationForm({ initialData: organization });

  const isLoading = isLoadingForm || isLoadingOrganization;

  useEffect(() => {
    if (organization) {
      setInitialData(organization);
    }
  }, [organization, setInitialData]);

  if (isError || (organization && !organization.id)) {
    notFound();
  }

  if (isError || (organization && !organization.id)) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm text-gray-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (data: OrganizationFormValues) => {
    handleSubmitOrganization(data, true, organizationId);
  };

  return (
    <div className="container space-y-6">
      <PageHeader title="Ubah User" description="Ubah user di Satu Peta." />

      <div className="bg-white rounded-md shadow">
        <OrganizationForm
          key={organizationId}
          initialData={formState}
          onSubmitAction={handleSubmit}
          isSubmitting={isSubmitting}
          onCancelAction={resetForm}
        />
      </div>
    </div>
  );
}
