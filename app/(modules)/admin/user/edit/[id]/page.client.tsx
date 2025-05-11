"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import userApi from "@/shared/services/user";
import { UserForm } from "../../_components/form";
import { useUserForm } from "../../_hooks/use-form";

export default function UserEditPageClient() {
  const params = useParams();
  const id = params.id as string;

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => userApi.getUserById(id),
  });

  const { handleSubmitUser, resetForm, isSubmitting } = useUserForm(user);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <UserForm
        defaultValues={user}
        onSubmitAction={handleSubmitUser}
        isSubmitting={isSubmitting}
        onCancelAction={resetForm}
      />
    </div>
  );
}
