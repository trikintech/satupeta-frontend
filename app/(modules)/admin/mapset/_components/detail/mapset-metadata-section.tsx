import { Mapset } from "@/shared/types/mapset";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function MapsetMetadataSection({ mapset }: { mapset: Mapset }) {
  const geoserverSource = mapset.sources.find(
    (source) =>
      source.credential.credential_type === "geoserver" &&
      source.url.includes("geoserver")
  );

  const geonetworkSource = mapset.sources.find((source) =>
    source.url.includes("geonetwork")
  );

  return (
    <div className="p-2 border rounded-[6px] border-zinc-200">
      <div className="py-2 px-4">
        <span className="text-lg font-semibold text-zinc-950">Metadata</span>
      </div>

      {/* Map Server Section */}
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">
          Map Server Terkait
        </div>
        <div className="text-sm text-zinc-800 flex items-center gap-2">
          {geoserverSource ? geoserverSource.name : "Lainnya"}
        </div>
      </div>

      {/* Layer URL */}
      {mapset.layer_url && (
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950 mb-1">
            Tautan Layer
          </div>
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

      {/* Metadata Server Section */}
      <div className="py-2 px-4">
        <div className="text-sm font-medium text-zinc-950">
          Metadata Server Terkait
        </div>
        <div className="text-sm text-zinc-800 flex items-center gap-2">
          {geonetworkSource ? geonetworkSource.name : "Lainnya"}
        </div>
      </div>

      {/* Metadata URL */}
      {mapset.metadata_url && (
        <div className="py-2 px-4">
          <div className="text-sm font-medium text-zinc-950 mb-1">
            Tautan Metadata
          </div>
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
