/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import categoryApi from "@/shared/services/category";
import classificationApi from "@/shared/services/classification";
import mapProjectionSystemApi from "@/shared/services/map-projection-system";
import { MapsetInfoForm } from "../_components/form/mapset-info-form";
import { Loader2 } from "lucide-react";
import organizationApi from "@/shared/services/organization";
import mapSourceApi from "@/shared/services/map-source";
import { MapsetMetadataForm } from "../_components/form/mapset-metadata-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MapsetVersionForm } from "../_components/form/mapset-version-form";
import mapsetApi from "@/shared/services/mapset";
import { MapsetSubmitPayload } from "@/shared/types/mapset";
import { PaginatedResponse } from "@/shared/types/api-response";
import MapsetTab from "../_components/form/mapset-tab";
import StatusValidation from "@/shared/config/status-validation";
import {
  activeTabAtom,
  initialFormState,
  mapsetFormAtom,
  MapsetFormState,
  MapsetFormTab,
} from "../state";

interface SelectOption {
  id: string;
  name: string;
}

export default function AddMapsPageClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [formState, setFormState] = useAtom(mapsetFormAtom);

  const { data: projectionSystemsResponse, isLoading: isLoadingProjections } =
    useQuery({
      queryKey: ["projectionSystems"],
      queryFn: () => mapProjectionSystemApi.getMapProjectionSystems(),
    });

  const { data: categoriesResponse, isLoading: isLoadingCategories } = useQuery(
    {
      queryKey: ["categories"],
      queryFn: () => categoryApi.getCategories(),
    }
  );

  const { data: classificationsResponse, isLoading: isLoadingClassifications } =
    useQuery({
      queryKey: ["classifications"],
      queryFn: () => classificationApi.getClassifications(),
    });

  const { data: organizationsResponse, isLoading: isLoadingOrganizations } =
    useQuery({
      queryKey: ["organizations"],
      queryFn: () => organizationApi.getOrganizations(),
    });

  const { data: mapSourcesResponse, isLoading: isLoadingMapSources } = useQuery(
    {
      queryKey: ["map-sources"],
      queryFn: () => mapSourceApi.getMapSources(),
    }
  );

  const isLoading =
    isLoadingProjections ||
    isLoadingCategories ||
    isLoadingClassifications ||
    isLoadingOrganizations ||
    isLoadingMapSources;

  // Ekstrak dan transformasi data untuk dikirim ke form
  const mapDataToOptions = <T extends { id: string; name: string }>(
    response: PaginatedResponse<T[]> | undefined
  ): SelectOption[] => {
    if (!response || !response.items) return [];
    return response.items.map((item) => ({ id: item.id, name: item.name }));
  };

  const projectionSystemOptions = mapDataToOptions(projectionSystemsResponse);
  const categoryOptions = mapDataToOptions(categoriesResponse);
  const classificationOptions = mapDataToOptions(classificationsResponse);
  const organizationOptions = mapDataToOptions(organizationsResponse);
  const mapSourceOptions = mapDataToOptions(mapSourcesResponse);

  // Handler untuk update form data
  const updateFormData = (tabKey: keyof MapsetFormState, data: any) => {
    setFormState({
      ...formState,
      [tabKey]: data,
    });
  };

  const handleContinue = () => {
    if (activeTab < MapsetFormTab.VERSION) {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (activeTab > MapsetFormTab.INFO) {
      setActiveTab(activeTab - 1);
    }
  };

  const submitMapsetMutation = useMutation({
    mutationFn: (mapsetData: Omit<MapsetSubmitPayload, "id">) => {
      return mapsetApi.createMapset(mapsetData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mapsets"] });
      setFormState(initialFormState);
      toast.success("Mapset berhasil disimpan!");
      router.push("/admin/mapset");
    },
    onError: (error: Error) => {
      console.error("Error creating mapset:", error);
      toast.error(error.message || "Terjadi kesalahan saat menyimpan data");
    },
  });

  const handleSubmitMapset = (versionData: {
    data_update_period: string;
    data_version: string;
  }) => {
    updateFormData("version", versionData);

    const payload: MapsetSubmitPayload = {
      name: formState.info.name,
      description: formState.info.description,
      scale: formState.info.scale,
      projection_system_id: formState.info.projection_system_id,
      category_id: formState.info.category_id,
      data_status: formState.info.data_status,
      classification_id: formState.info.classification_id,
      producer_id: formState.info.organization_id,
      source_id: formState.metadata.source_id,
      layer_url: formState.metadata.layer_url,
      data_update_period: versionData.data_update_period,
      data_version: versionData.data_version,
      is_popular: false,
      is_active: true,
      regional_id: "01968b53-a910-7a67-bd10-975b8923b92e",
      status_validation: StatusValidation.ON_VERIFICATION,
    };

    submitMapsetMutation.mutate(payload);
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
      {/* Tab Navigation */}
      <MapsetTab
        formState={formState}
        activeTab={activeTab}
        handleTabChange={(e: number) => setActiveTab(e)}
      />
      {/* Tab Content */}
      <div className="bg-white rounded-md shadow">
        {activeTab === MapsetFormTab.INFO && (
          <MapsetInfoForm
            initialData={formState.info}
            projectionSystems={projectionSystemOptions}
            categories={categoryOptions}
            classifications={classificationOptions}
            organizations={organizationOptions}
            onSubmit={(data) => {
              updateFormData("info", data);
              handleContinue();
            }}
          />
        )}
        {activeTab === MapsetFormTab.METADATA && (
          <MapsetMetadataForm
            initialData={formState.metadata}
            mapSources={mapSourceOptions}
            onSubmit={(data) => {
              updateFormData("metadata", data);
              handleContinue();
            }}
            onPrevious={handlePrevious}
          />
        )}

        {activeTab === MapsetFormTab.VERSION && (
          <MapsetVersionForm
            initialData={formState.version}
            onSubmit={handleSubmitMapset}
            onPrevious={handlePrevious}
            isSubmitting={submitMapsetMutation.isPending}
          />
        )}
      </div>
    </div>
  );
}
