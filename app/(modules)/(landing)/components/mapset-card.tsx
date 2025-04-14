import { Card, CardContent } from "@/shared/components/ui/card";
import { Mapset } from "@/shared/types/mapset";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const PreviewMap = dynamic(() => import("@/shared/components/preview-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square bg-gray-200 animate-pulse" />
  ),
});

export function MapsetCard({ mapset }: Readonly<{ mapset: Mapset }>) {
  return (
    <Card className="cursor-pointer group w-full h-full p-0 overflow-hidden border rounded-lg">
      <div className="grid grid-cols-2 h-full">
        <div className="w-full aspect-square">
          <PreviewMap mapset={mapset} />
        </div>

        <CardContent className="flex flex-col justify-between py-3 px-4 h-full">
          <div className="space-y-2">
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">
              Categories
            </span>
            <div
              className="line-clamp-4 hover:text-primary mt-2 font-medium lg:line-clamp-2 xl:line-clamp-3
              text-base sm:text-lg md:text-lg lg:text-lg xl:text-2xl"
            >
              {mapset?.name}
            </div>
          </div>
          <div className="mt-4 self-start">
            <ArrowRight className="text-primary" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
