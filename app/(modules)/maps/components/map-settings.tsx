import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useAtom } from "jotai";
import { Map } from "lucide-react";
import { mapTypeAtom } from "../state/map-type";
import { basemapConfig } from "../config/basemap-config";
import { activeBasemapAtom, BasemapType } from "../state/active-basemap";
import { useState } from "react";
import { featureFlags } from "@/shared/config/feature-flag";

const MapSettings = () => {
  const [mapType, setMapType] = useAtom(mapTypeAtom);
  const [activeBasemap, setActiveBasemap] = useAtom(activeBasemapAtom);
  const [activeBasemapName, setActiveBasemapName] = useState(
    basemapConfig[activeBasemap].name
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"default"}>
          <Map />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-[403] p-2 mr-4 text-sm"
        side="left"
        align="start"
      >
        <div className="grid gap-2">
          {featureFlags.advancedMaps.isActive && (
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
          )}
          <div>
            <div>Base Map</div>
            <div className="text-xs">{activeBasemapName}</div>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-4 items-center gap-2">
              {Object.entries(basemapConfig).map(
                ([key, { thumbnail, name }]) => (
                  <button
                    key={key}
                    onMouseEnter={() => setActiveBasemapName(name)}
                    onMouseLeave={() =>
                      setActiveBasemapName(basemapConfig[activeBasemap].name)
                    }
                    onClick={() => {
                      setActiveBasemap(key as BasemapType);
                    }}
                    className={`cursor-pointer w-16 h-16 rounded text-xs break-words bg-gray-300 bg-cover bg-center hover:border border-primary ${
                      activeBasemap === key && "border"
                    }`}
                    style={{
                      backgroundImage: `url(${
                        thumbnail ? `/${thumbnail}` : ""
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></button>
                )
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MapSettings;
