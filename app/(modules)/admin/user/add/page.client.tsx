"use client";

import { Loader2 } from "lucide-react";
import { useUserForm } from "../_hooks/use-form";
import { UserForm } from "../_components/form";
import { useSession } from "next-auth/react";
import { isAdministrator } from "@/shared/config/role";

export default function AddUserPageClient() {
  const { data: session } = useSession();
  const { isLoading, handleSubmitUser, resetForm, isSubmitting } =
    useUserForm();

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
      <UserForm
        onSubmitAction={handleSubmitUser}
        isSubmitting={isSubmitting}
        onCancelAction={resetForm}
        isAdministrator={isAdministrator(session?.user?.role)}
      />
    </div>
  );
}
