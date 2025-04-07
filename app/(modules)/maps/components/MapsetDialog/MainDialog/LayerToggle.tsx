import { Mapset } from "../../../types/Mapset";
import { Button } from "@/shared/components/ui/button";
import { useLayerToggle } from "../../../hooks/useLayerToggle";

export const LayerToggle = ({ mapset }: { mapset: Mapset }) => {
  const { isActive, toggleLayer } = useLayerToggle(mapset);

  return (
    <Button
      onClick={toggleLayer}
      className="absolute bottom-4 right-4 z-[403]"
      variant={isActive ? "destructive" : "default"}
    >
      {isActive ? "Remove Layer" : "Add Layer"}
    </Button>
  );
};
