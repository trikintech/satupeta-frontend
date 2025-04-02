import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useSetAtom } from "jotai";
import { Settings2 } from "lucide-react";
import { mapTypeAtom } from "../state/mapTypeAtom";

const MapSettings = () => {
  const setMapType = useSetAtom(mapTypeAtom);

  return (
    <div className="absolute top-4 right-4 z-[403]">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"default"}>
            <Settings2 />
            Map Settings
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-[403] mr-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Map View</h4>
              <p className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
                <Button size={"sm"} onClick={() => setMapType("leaflet")}>
                  2D
                </Button>
                <Button size={"sm"} onClick={() => setMapType("cesium")}>
                  3D
                </Button>
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4"></div>
              <div className="grid grid-cols-3 items-center gap-4"></div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MapSettings;
