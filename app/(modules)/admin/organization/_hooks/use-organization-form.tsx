import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import organizationApi from "@/shared/services/organization";
import roleApi from "@/shared/services/role";
import { initialFormState, organizationFormAtom } from "../state";
import { OrganizationFormValues } from "@/shared/schemas/organization";
import { PaginatedResponse } from "@/shared/types/api-response";
import { useEffect } from "react";

interface SelectOption {
  id: string;
  name: string;
}

interface UseOrganizationFormProps {
  initialData?: Partial<OrganizationFormValues>;
}

export function useOrganizationForm({
  initialData,
}: UseOrganizationFormProps = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formState, setFormState] = useAtom(organizationFormAtom);

  useEffect(() => {
    if (initialData) {
      setFormState((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData, setFormState]);

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

  const updateFormData = (updatedData: Partial<OrganizationFormValues>) => {
    setFormState((prevState) => ({
      ...prevState,
      ...updatedData,
    }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    router.push("/admin/organization");
  };

  const createOrganizationMutation = useMutation({
    mutationFn: (organizationData: Omit<OrganizationFormValues, "id">) =>
      organizationApi.createOrganization(organizationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      setFormState(initialFormState);
      toast.success("Organization berhasil disimpan!");
      router.push("/admin/organization");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Terjadi kesalahan saat menyimpan data");
    },
  });

  const updateOrganizationMutation = useMutation({
    mutationFn: ({
      id,
      organizationData,
    }: {
      id: string;
      organizationData: OrganizationFormValues;
    }) => organizationApi.updateOrganization(id, organizationData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      setFormState(initialFormState);
      toast.success("Organization berhasil diperbarui!");
      router.push("/admin/organization");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Terjadi kesalahan saat memperbarui data");
    },
  });

  const handleSubmitOrganization = (
    data: OrganizationFormValues,
    isEdit = false,
    id?: string
  ) => {
    updateFormData(data);

    if (isEdit) {
      if (id) {
        updateOrganizationMutation.mutate({ id, organizationData: data });
      } else {
        toast.error("ID is required to update the organization.");
      }
    } else {
      createOrganizationMutation.mutate(data);
    }
  };
  const setInitialData = (data: OrganizationFormValues) => {
    setFormState(data);
  };

  return {
    setInitialData,
    formState,
    isLoading,
    organizationOptions,
    roleOptions,
    handleSubmitOrganization,
    resetForm,
    updateFormData,
    isSubmitting:
      createOrganizationMutation.isPending ||
      updateOrganizationMutation.isPending,
  };
}
