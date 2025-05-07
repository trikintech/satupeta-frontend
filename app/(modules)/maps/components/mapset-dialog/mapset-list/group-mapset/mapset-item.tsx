import { useLayerToggle } from "@/app/(modules)/maps/hooks/useLayerToggle";
import { Mapset } from "@/shared/types/mapset";
import { cn } from "@/shared/utils/utils";
import { Minus, Plus } from "lucide-react";

interface MapsetItemProps {
  mapset: Mapset;
  onClick: (mapset: Mapset) => void;
  isSelected: boolean;
}

export default function MapsetItem({
  mapset,
  onClick,
  isSelected,
}: MapsetItemProps) {
  const { isActiveLayer, toggleLayer } = useLayerToggle(mapset);

  return (
    <button
      key={mapset.id}
      className="flex justify-between items-start w-full text-left"
      onClick={() => onClick(mapset)}
    >
      <span
        className={cn(
          "text-sm",
          isSelected ? "font-semibold text-black" : "text-gray-700"
        )}
      >
        {mapset.name}
      </span>
      {isActiveLayer ? (
        <Minus
          className="absolute right-2.5 w-4 h-4 mt-1 text-zinc-950"
          onClick={toggleLayer}
          strokeWidth={1}
        />
      ) : (
        <Plus
          className="absolute right-2.5 w-4 h-4 mt-1 text-zinc-950"
          onClick={toggleLayer}
          strokeWidth={1}
        />
      )}
    </button>
  );
}
