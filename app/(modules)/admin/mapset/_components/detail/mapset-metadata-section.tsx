import { Mapset } from "@/shared/types/mapset";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function MapsetMetadataSection({ mapset }: { mapset: Mapset }) {
  return (
    <div className="p-2 border rounded-[6px] border-zinc-200">
      <div className="py-2 px-4">
        <span className="text-lg font-semibold text-zinc-950">Metadata</span>
      </div>
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">
          Map Server Terkait
        </div>
        <div className="text-sm text-zinc-800">
          {mapset.source ? mapset.source.name : "Lainnya"}
        </div>
      </div>
      {mapset?.layer_url && (
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950 mb-1">Tautan</div>
          <div className="text-sm text-zinc-800">
            <Link
              href={mapset.layer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              <div className="inline-flex text-sm items-center space-x-1 bg-slate-100 p-1 rounded">
                <div>View Layer</div>
                <ExternalLink width={14} height={14} />
              </div>
            </Link>
          </div>
        </div>
      )}

      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">
          Metadata Server Terkait
        </div>
        <div className="text-sm text-zinc-800">
          {mapset.metadata_source ? mapset.metadata_source?.name : "Lainnya"}
        </div>
      </div>
      {mapset?.metadata_url && (
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950 mb-1">Tautan</div>
          <div className="text-sm text-zinc-800">
            <Link
              href={mapset.metadata_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              <div className="inline-flex text-sm items-center space-x-1 bg-slate-100 p-1 rounded">
                <div>View Metadata</div>
                <ExternalLink width={14} height={14} />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
