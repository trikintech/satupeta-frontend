"use client";

import { Loader2 } from "lucide-react";
import { useOrganizationForm } from "../_hooks/use-organization-form";
import { OrganizationForm } from "../_components/form";

export default function AddOrganizationPageClient() {
  const { isLoading, handleSubmitOrganization, resetForm, isSubmitting } =
    useOrganizationForm();

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

  return (
    <div className="max-w-xl">
      <OrganizationForm
        onSubmitAction={handleSubmitOrganization}
        isSubmitting={isSubmitting}
        onCancelAction={resetForm}
      />
    </div>
  );
}
