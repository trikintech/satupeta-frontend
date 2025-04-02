import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useAtom, useSetAtom } from "jotai";
import { Settings2 } from "lucide-react";
import { mapTypeAtom } from "../state/mapTypeAtom";
import { basemapConfig } from "../config/basemapConfig";
import { activeBasemapAtom, BasemapType } from "../state/activeBasemapAtom";

const MapSettings = () => {
  const [mapType, setMapType] = useAtom(mapTypeAtom);
  const setActiveBasemap = useSetAtom(activeBasemapAtom);

  return (
    <div className="absolute top-4 right-4 z-[403]">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"default"}>
            <Settings2 />
            Map Settings
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-[403] p-2 mr-4 text-sm">
          <div className="grid gap-2">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Map View</h4>
              <p className="text-muted-foreground grid grid-cols-2 gap-2">
                <Button
                  className="text-xs rounded"
                  size={"sm"}
                  variant={mapType === "leaflet" ? "default" : "secondary"}
                  onClick={() => setMapType("leaflet")}
                >
                  2D
                </Button>
                <Button
                  className="text-xs rounded"
                  size={"sm"}
                  variant={mapType === "cesium" ? "default" : "secondary"}
                  onClick={() => setMapType("cesium")}
                >
                  3D
                </Button>
              </p>
            </div>
            <div>
              <div>Base Map</div>
              <div className="text-xs">Dark Matter</div>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-4 items-center gap-2">
                {Object.entries(basemapConfig).map(([key, { thumbnail }]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveBasemap(key as BasemapType);
                    }}
                    className="cursor-pointer w-16 h-16 rounded text-xs break-words bg-gray-300 bg-cover bg-center hover:border hover:border-primary"
                    style={{
                      backgroundImage: `url(${
                        thumbnail ? `/${thumbnail}` : ""
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MapSettings;
