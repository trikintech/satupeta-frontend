"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import credentialApi from "@/shared/services/credential";
import { CredentialForm } from "../../_components/form";
import { useCredentialForm } from "../../_components/use-credential-form";
import { CredentialFormValues } from "@/shared/schemas/credential";

export default function CredentialEditPageClient() {
  const params = useParams();
  const id = params.id as string;

  const { data: credential, isLoading } = useQuery({
    queryKey: ["credential", id],
    queryFn: () => credentialApi.getCredentialDecrypted(id),
  });

  const { handleSubmitCredential, resetForm, isSubmitting } =
    useCredentialForm(credential);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <CredentialForm
        defaultValues={credential as Partial<CredentialFormValues>}
        onSubmitAction={handleSubmitCredential}
        isSubmitting={isSubmitting}
        onCancelAction={resetForm}
      />
    </div>
  );
}
