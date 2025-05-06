/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import categoryApi from "@/shared/services/category";
import classificationApi from "@/shared/services/classification";
import mapProjectionSystemApi from "@/shared/services/map-projection-system";
import { MapsetInfoForm } from "./components/mapset-info-form";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import organizationApi from "@/shared/services/organization";
import { MapsetOrganizationForm } from "./components/mapset-organization-form";
import mapSourceApi from "@/shared/services/map-source";
import { MapsetMetadataForm } from "./components/mapset-metadata-form";

// Interface untuk struktur PaginatedResponse
export interface PaginatedResponse<T> {
  items: T;
  total: number;
  limit: number;
  has_more: boolean;
}

// Interface untuk SelectOption
interface SelectOption {
  id: string;
  name: string;
}

// Enum untuk tab navigation
enum MapsetFormTab {
  INFO = 0,
  ORGANIZATION = 1,
  METADATA = 2,
  CLASSIFICATION = 3,
  VERSION = 4,
}

// Struktur data form
interface MapsetFormState {
  // Tab 1: Informasi Mapset
  info: {
    name: string;
    description: string;
    scale: string;
    projection_system_id: string;
    category_id: string;
    classification_id: string;
    data_status: "sementara" | "tetap";
  };
  // Tab 2: Informasi Organisasi
  organization: {
    organization_id: string;
    phone_number: string;
  };
  // Tab 3: Metadata
  metadata: {
    metadata_name: string;
    data_source: string;
    map_server_id: string;
    server_link: string;
  };
  // Tab 4: Klasifikasi Wilayah
  classification: Record<string, any>;
  // Tab 5: Informasi Versi
  version: Record<string, any>;
}

// Default form state
const initialFormState: MapsetFormState = {
  info: {
    name: "",
    description: "",
    scale: "",
    projection_system_id: "",
    category_id: "",
    classification_id: "",
    data_status: "sementara",
  },
  organization: {
    organization_id: "",
    phone_number: "",
  },
  metadata: {
    metadata_name: "",
    data_source: "",
    map_server_id: "",
    server_link: "",
  },
  classification: {},
  version: {},
};

// Atom untuk menyimpan data form (dengan local storage untuk persistensi)
const mapsetFormAtom = atomWithStorage<MapsetFormState>(
  "mapsetForm",
  initialFormState
);
// Atom untuk active tab
const activeTabAtom = atom<MapsetFormTab>(MapsetFormTab.INFO);

export default function AddMapsPageClient() {
  // Gunakan Jotai atoms
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [formState, setFormState] = useAtom(mapsetFormAtom);

  // Data queries
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

  // Status loading gabungan
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

  // Handler untuk navigasi tab
  const handleTabChange = (tab: MapsetFormTab) => {
    setActiveTab(tab);
  };

  // Handler ketika klik tombol lanjutkan
  const handleContinue = () => {
    if (activeTab < MapsetFormTab.VERSION) {
      setActiveTab(activeTab + 1);
    }
  };

  // Handler untuk tombol navigasi
  const handlePrevious = () => {
    if (activeTab > MapsetFormTab.INFO) {
      setActiveTab(activeTab - 1);
    }
  };

  // Render loading state
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
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-1">
          <TabButton
            isActive={activeTab === MapsetFormTab.INFO}
            onClick={() => handleTabChange(MapsetFormTab.INFO)}
            icon={<InfoIcon />}
            label="Informasi Mapset"
            isCompleted={!!formState.info.name} // Tandai tab sudah diisi
          />
          <TabButton
            isActive={activeTab === MapsetFormTab.ORGANIZATION}
            onClick={() => handleTabChange(MapsetFormTab.ORGANIZATION)}
            icon={<OrgIcon />}
            label="Informasi Organisasi"
            isCompleted={Object.keys(formState.organization).length > 0}
          />
          <TabButton
            isActive={activeTab === MapsetFormTab.METADATA}
            onClick={() => handleTabChange(MapsetFormTab.METADATA)}
            icon={<MetadataIcon />}
            label="Metadata"
            isCompleted={Object.keys(formState.metadata).length > 0}
          />
          <TabButton
            isActive={activeTab === MapsetFormTab.CLASSIFICATION}
            onClick={() => handleTabChange(MapsetFormTab.CLASSIFICATION)}
            icon={<ClassificationIcon />}
            label="Klasifikasi Wilayah"
            isCompleted={Object.keys(formState.classification).length > 0}
          />
          <TabButton
            isActive={activeTab === MapsetFormTab.VERSION}
            onClick={() => handleTabChange(MapsetFormTab.VERSION)}
            icon={<VersionIcon />}
            label="Informasi Versi"
            isCompleted={Object.keys(formState.version).length > 0}
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-md shadow">
        {activeTab === MapsetFormTab.INFO && (
          <MapsetInfoForm
            initialData={formState.info}
            projectionSystems={projectionSystemOptions}
            categories={categoryOptions}
            classifications={classificationOptions}
            onSubmit={(data) => {
              updateFormData("info", data);
              handleContinue();
            }}
          />
        )}
        {activeTab === MapsetFormTab.ORGANIZATION && (
          <MapsetOrganizationForm
            initialData={formState.organization}
            organizations={organizationOptions}
            onSubmit={(data) => {
              updateFormData("organization", data);
              handleContinue();
            }}
            onPrevious={handlePrevious}
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
        {activeTab === MapsetFormTab.CLASSIFICATION && (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Klasifikasi Wilayah</h3>
            {/* Form klasifikasi wilayah akan diimplementasikan di sini */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Kembali
              </button>
              <button
                onClick={() => {
                  updateFormData("classification", { completed: true });
                  handleContinue();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        )}
        {activeTab === MapsetFormTab.VERSION && (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Informasi Versi</h3>
            {/* Form informasi versi akan diimplementasikan di sini */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Kembali
              </button>
              <button
                onClick={() => {
                  updateFormData("version", { completed: true });
                  // Kirim semua data form ke server disini
                  console.log("Form lengkap:", formState);
                  alert("Form berhasil disimpan!");
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Simpan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Komponen TabButton
interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isCompleted?: boolean;
}

const TabButton = ({
  isActive,
  onClick,
  icon,
  label,
  isCompleted,
}: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center px-4 py-2 border-b-2 focus:outline-none relative",
        isActive
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      )}
    >
      <span className="mr-2">{icon}</span>
      <span>{label}</span>
      {isCompleted && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
      )}
    </button>
  );
};

// Icon components
const InfoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 8V12M12 16H12.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const OrgIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 21H21M3 18H21M8 18V13M16 18V13M12 18V13M4 13H20C20.5523 13 21 12.5523 21 12V5C21 4.44772 20.5523 4 20 4H4C3.44772 4 3 4.44772 3 5V12C3 12.5523 3.44772 13 4 13Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MetadataIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V13M19 10L21 8M21 8L19 6M21 8H11M13 3H15C15.5523 3 16 3.44772 16 4V8C16 8.55228 15.5523 9 15 9H13C12.4477 9 12 8.55228 12 8V4C12 3.44772 12.4477 3 13 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClassificationIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 4H6C5.44772 4 5 4.44772 5 5V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V15M18 9L20 7M20 7L18 5M20 7H10M15 2H17C17.5523 2 18 2.44772 18 3V7C18 7.55228 17.5523 8 17 8H15C14.4477 8 14 7.55228 14 7V3C14 2.44772 14.4477 2 15 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const VersionIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4V20M12 4L8 8M12 4L16 8M6 12H18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
