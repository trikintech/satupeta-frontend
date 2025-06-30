import Image from "next/image";
import { getLegendUrl } from "@/shared/utils/wms";
import { ActiveLayer } from "@/app/(modules)/maps/state/active-layers";

interface LegendDisplayProps {
  layer: ActiveLayer;
}

export const LegendDisplay = ({ layer }: LegendDisplayProps) => {
  return (
    <div className="pt-2 mt-2">
      <div className="text-xs text-gray-500">
        {layer.layer.url ? (
          <Image
            src={getLegendUrl({
              baseUrl: layer.layer.url,
              layerName: layer.layer.layers ?? "",
              width: 200,
            })}
            alt={`${layer.name} legend`}
            width={200}
            height={40}
            className="w-auto h-auto max-w-full"
            unoptimized
          />
        ) : (
          <p>No legend available</p>
        )}
      </div>
    </div>
  );
};
