/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import organizationApi from "@/shared/services/organization";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import userApi from "@/shared/services/user";
import { UserSubmitPayload } from "@/shared/types/user";
import { PaginatedResponse } from "@/shared/types/api-response";
import roleApi from "@/shared/services/role";
import {
  initialFormState,
  userFormAtom,
  UserFormState,
} from "../../../state/user-form";
import { UserForm } from "../../components/user-form";
import { useEffect } from "react";
import PageHeader from "../../../components/page-header";

interface SelectOption {
  id: string;
  name: string;
}

export default function EditUserPageClient() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const queryClient = useQueryClient();
  const [formState, setFormState] = useAtom(userFormAtom);

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userApi.getUserById(userId),
    enabled: !!userId,
  });

  const { data: rolesResponse, isLoading: isLoadingRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => roleApi.getRoles(),
  });

  const { data: organizationsResponse, isLoading: isLoadingOrganizations } =
    useQuery({
      queryKey: ["organizations"],
      queryFn: () => organizationApi.getOrganizations(),
    });

  const isLoading = isLoadingOrganizations || isLoadingRoles || isLoadingUser;

  useEffect(() => {
    if (!user) return;
    setFormState({
      name: user.name,
      email: user.email,
      profile_picture: user.profile_picture,
      username: user.username,
      position: user.position,
      role_id: user.role_id,
      employee_id: user.employee_id,
      organization_id: user.organization_id,
      is_active: user.is_active,
    });
  }, [user, setFormState]);

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

  const updateUserMutation = useMutation({
    mutationFn: (userData: UserSubmitPayload) => {
      return userApi.updateUser(userId, userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      toast.success("User berhasil diperbarui!");
      router.push("/admin/mapset");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Terjadi kesalahan saat memperbarui data");
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

    updateUserMutation.mutate(payload);
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
    <div className="container space-y-6">
      <PageHeader title="Ubah User" description="Ubah user di Satu Peta." />
      <div className="bg-white rounded-md shadow">
        <UserForm
          initialData={formState}
          onSubmit={handleSubmitUser}
          isSubmitting={updateUserMutation.isPending}
          roles={roleOptions}
          organizations={organizationOptions}
          onCancel={resetForm}
        />
      </div>
    </div>
  );
}
