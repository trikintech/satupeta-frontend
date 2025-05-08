"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import organizationApi from "@/shared/services/organization";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import userApi from "@/shared/services/user";
import { UserSubmitPayload } from "@/shared/types/user";
import { PaginatedResponse } from "@/shared/types/api-response";
import { initialFormState, userFormAtom, UserFormState } from "../state";
import { UserForm } from "../_components/user-form";
import roleApi from "@/shared/services/role";

interface SelectOption {
  id: string;
  name: string;
}

export default function AddMapsPageClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formState, setFormState] = useAtom(userFormAtom);

  const { data: rolesResponse, isLoading: isLoadingRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => roleApi.getRoles(),
  });

  const { data: organizationsResponse, isLoading: isLoadingOrganizations } =
    useQuery({
      queryKey: ["organizations"],
      queryFn: () => organizationApi.getOrganizations(),
    });

  const isLoading = isLoadingOrganizations || isLoadingRoles;

  const mapDataToOptions = <T extends { id: string; name: string }>(
    response: PaginatedResponse<T[]> | undefined
  ): SelectOption[] => {
    if (!response || !response.items) return [];
    return response.items.map((item) => ({ id: item.id, name: item.name }));
  };

  const organizationOptions = mapDataToOptions(organizationsResponse);
  const roleOptions = mapDataToOptions(rolesResponse);

  const updateFormData = (updatedData: Partial<UserFormState>) => {
    setFormState((prevState) => ({
      ...prevState,
      ...updatedData,
    }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    router.push("/admin/user");
  };

  const submitUserMutation = useMutation({
    mutationFn: (userData: Omit<UserSubmitPayload, "id">) => {
      return userApi.createUser(userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setFormState(initialFormState);
      toast.success("User berhasil disimpan!");
      router.push("/admin/user");
    },
    onError: (error: Error) => {
      console.error("Error creating user:", error);
      toast.error(error.message || "Terjadi kesalahan saat menyimpan data");
    },
  });

  const handleSubmitUser = (data: UserSubmitPayload) => {
    updateFormData(data);

    const payload: UserSubmitPayload = {
      name: data.name,
      password: data.password,
      email: data.email,
      profile_picture: data.profile_picture,
      username: data.username,
      position: data.position,
      role_id: data.role_id,
      employee_id: data.employee_id,
      organization_id: data.organization_id,
      is_active: data.is_active,
    };

    submitUserMutation.mutate(payload);
  };
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
    <div className="container mx-auto py-4">
      {/* Tab Content */}
      <div className="bg-white rounded-md shadow">
        <UserForm
          initialData={formState}
          onSubmitAction={handleSubmitUser}
          isSubmitting={submitUserMutation.isPending}
          roles={roleOptions}
          organizations={organizationOptions}
          onCancelAction={resetForm}
        />
      </div>
    </div>
  );
}
