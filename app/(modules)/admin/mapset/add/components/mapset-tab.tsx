import { cn } from "@/shared/utils/utils";
import { useAtom } from "jotai";
import { Circle, CircleCheck } from "lucide-react";
import { activeTabAtom } from "../../../state/mapset-form";
import { MapsetFormState, MapsetFormTab } from "../types";

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
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      )}
    >
      {isCompleted ? (
        <span className="mr-2 text-primary">
          <CircleCheck />
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MapsetTab({ formState }: any) {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  const handleTabChange = (tab: MapsetFormTab) => {
    setActiveTab(tab);
  };
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
      case "organization":
        return Boolean(data.organization_id);
      case "metadata":
        return Boolean(data.source_id && data.layer_url);
      case "version":
        return Boolean(data.update_period && data.data_version);
      default:
        return false;
    }
  };

  return (
    <div className="mb-6 border-b border-gray-200">
      <div className="flex space-x-1">
        <TabButton
          isActive={activeTab === MapsetFormTab.INFO}
          onClick={() => handleTabChange(MapsetFormTab.INFO)}
          label="Informasi Mapset"
          isCompleted={isTabComplete("info")} // Tandai tab sudah diisi
        />
        <TabButton
          isActive={activeTab === MapsetFormTab.ORGANIZATION}
          onClick={() => handleTabChange(MapsetFormTab.ORGANIZATION)}
          label="Informasi Organisasi"
          isCompleted={isTabComplete("organization")}
        />
        <TabButton
          isActive={activeTab === MapsetFormTab.METADATA}
          onClick={() => handleTabChange(MapsetFormTab.METADATA)}
          label="Metadata"
          isCompleted={isTabComplete("metadata")}
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
