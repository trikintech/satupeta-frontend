import { CardContent, Card } from "@/shared/components/ui/card";
import { Mapset } from "@/shared/types/mapset";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const PreviewMap = dynamic(() => import("@/shared/components/preview-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-gray-200 animate-pulse rounded-t-lg" />
  ),
});

export function MainMapsetCard({ mapset }: Readonly<{ mapset: Mapset }>) {
  return (
    <Card className="w-full h-full overflow-hidden p-0">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative aspect-video w-full">
          <PreviewMap mapset={mapset} />
        </div>

        <div className="flex flex-col flex-1 p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">
              categories
            </span>
          </div>

          <h3
            className="line-clamp-4 hover:text-primary mb-0 font-medium lg:line-clamp-2 xl:line-clamp-3
              text-base sm:text-lg md:text-lg lg:text-lg xl:text-2xl"
          >
            {mapset.name}
          </h3>

          <div className="mt-auto pt-2">
            <a
              href={`/mapsets/${mapset.id}`}
              className="inline-flex items-center text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowRight />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
