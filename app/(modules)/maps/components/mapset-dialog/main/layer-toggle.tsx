import { Button } from "@/shared/components/ui/button";
import { useLayerToggle } from "../../../hooks/useLayerToggle";
import { Mapset } from "@/shared/types/mapset";

export const LayerToggle = ({ mapset }: { mapset: Mapset }) => {
  const { isActiveLayer, toggleLayer } = useLayerToggle(mapset);

  return (
    <Button
      onClick={toggleLayer}
      className="absolute bottom-4 right-4 z-[403]"
      variant={isActiveLayer ? "destructive" : "default"}
    >
      {isActiveLayer ? "Remove Layer" : "Add Layer"}
    </Button>
  );
};
