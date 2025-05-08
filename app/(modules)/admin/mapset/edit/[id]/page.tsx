"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import categoryApi from "@/shared/services/category";
import classificationApi from "@/shared/services/classification";
import mapProjectionSystemApi from "@/shared/services/map-projection-system";
import organizationApi from "@/shared/services/organization";
import mapSourceApi from "@/shared/services/map-source";
import mapsetApi from "@/shared/services/mapset";

import { MapsetInfoForm } from "../../_components/form/mapset-info-form";
import { MapsetMetadataForm } from "../../_components/form/mapset-metadata-form";
import { MapsetVersionForm } from "../../_components/form/mapset-version-form";
import MapsetTab from "../../_components/form/mapset-tab";

import { PaginatedResponse } from "@/shared/types/api-response";
import { MapsetSubmitPayload } from "@/shared/types/mapset";
import StatusValidation from "@/shared/config/status-validation";
import {
  activeTabAtom,
  mapsetFormAtom,
  MapsetFormState,
  MapsetFormTab,
} from "../../../_state/mapset-form";
import PageHeader from "../../../_components/page-header";

interface SelectOption {
  id: string;
  name: string;
}

export default function EditMapsPageClient() {
  const router = useRouter();
  const params = useParams();
  const mapsetId = params.id as string;
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [formState, setFormState] = useAtom(mapsetFormAtom);

  const { data: mapset, isLoading: isLoadingMapset } = useQuery({
    queryKey: ["mapset", mapsetId],
    queryFn: () => mapsetApi.getMapsetById(mapsetId),
    enabled: !!mapsetId,
  });

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

  useEffect(() => {
    if (mapset) {
      setFormState({
        info: {
          name: mapset.name,
          description: mapset.description,
          scale: mapset.scale,
          projection_system_id: mapset.projection_system.id,
          category_id: mapset.category.id,
          data_status: mapset.data_status,
          classification_id: mapset.classification.id,
          organization_id: mapset.producer.id,
        },
        metadata: {
          source_id: mapset.source.id,
          layer_url: mapset.layer_url,
        },
        version: {
          update_period: mapset.data_update_period,
          data_version: mapset.data_version,
        },
      });
    }
  }, [mapset, setFormState]);

  const isLoading =
    isLoadingMapset ||
    isLoadingProjections ||
    isLoadingCategories ||
    isLoadingClassifications ||
    isLoadingOrganizations ||
    isLoadingMapSources;

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const updateMapsetMutation = useMutation({
    mutationFn: (mapsetData: MapsetSubmitPayload) => {
      return mapsetApi.updateMapset(mapsetId, mapsetData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mapsets"] });
      queryClient.invalidateQueries({ queryKey: ["mapset", mapsetId] });
      toast.success("Mapset berhasil diperbarui!");
      router.push("/admin/mapset");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Terjadi kesalahan saat memperbarui data");
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
      is_popular: mapset?.is_popular || false,
      is_active: mapset?.is_active || true,
      regional_id:
        mapset?.regional.id || "01968b53-a910-7a67-bd10-975b8923b92e",
      status_validation:
        mapset?.status_validation || StatusValidation.ON_VERIFICATION,
    };

    updateMapsetMutation.mutate(payload);
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
      <PageHeader
        title="Ubah Mapset dan Metadata"
        description="Ubah mapset dan metadata untuk memperbarui data geospasial di Satu Peta."
      />
      <MapsetTab
        formState={formState}
        activeTab={activeTab}
        handleTabChange={(e: number) => setActiveTab(e)}
      />
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
            isSubmitting={updateMapsetMutation.isPending}
          />
        )}
      </div>
    </div>
  );
}
