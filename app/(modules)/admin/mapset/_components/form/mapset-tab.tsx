import { cn } from "@/shared/utils/utils";
import { Circle, CircleCheck } from "lucide-react";
import { MapsetFormState, MapsetFormTab } from "../../state";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  isCompleted?: boolean;
}

const TabButton = ({
  isActive,
  onClick,
  label,
  isCompleted,
}: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center px-4 py-2 border-b-2 focus:outline-none relative",
        isActive
          ? "border-primary text-primary"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      )}
    >
      {isCompleted ? (
        <span className="mr-2 text-primary">
          <CircleCheck className="w-4 h-4" />
        </span>
      ) : (
        <span className="mr-2 text-zinc-400">
          <Circle />
        </span>
      )}

      <span>{label}</span>
    </button>
  );
};

export default function MapsetTab({
  formState,
  activeTab,
  handleTabChange,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  const isTabComplete = (tabKey: keyof MapsetFormState): boolean => {
    const data = formState[tabKey];

    switch (tabKey) {
      case "info":
        return Boolean(
          data.name &&
            data.projection_system_id &&
            data.category_id &&
            data.classification_id
        );
      case "metadata":
        return Boolean(data.metadata_url && data.layer_url);
      case "classification":
        return Boolean(data.coverage_area && data.coverage_level);
      case "version":
        return Boolean(data.data_update_period && data.data_version);
      default:
        return false;
    }
  };

  return (
    <div className="border-b border-gray-200 bg-zinc-50 text-sm">
      <div className="flex space-x-1">
        <TabButton
          isActive={activeTab === MapsetFormTab.INFO}
          onClick={() => handleTabChange(MapsetFormTab.INFO)}
          label="Informasi Mapset"
          isCompleted={isTabComplete("info")} // Tandai tab sudah diisi
        />
        <TabButton
          isActive={activeTab === MapsetFormTab.METADATA}
          onClick={() => handleTabChange(MapsetFormTab.METADATA)}
          label="Metadata"
          isCompleted={isTabComplete("metadata")}
        />
        <TabButton
          isActive={activeTab === MapsetFormTab.CLASSIFICATION}
          onClick={() => handleTabChange(MapsetFormTab.CLASSIFICATION)}
          label="Klasifikasi"
          isCompleted={isTabComplete("classification")}
        />

        <TabButton
          isActive={activeTab === MapsetFormTab.VERSION}
          onClick={() => handleTabChange(MapsetFormTab.VERSION)}
          label="Informasi Versi"
          isCompleted={isTabComplete("version")}
        />
      </div>
    </div>
  );
}
