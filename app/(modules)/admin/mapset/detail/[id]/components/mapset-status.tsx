import { Mapset } from "@/shared/types/mapset";
import { Check, LoaderCircle, XIcon } from "lucide-react";

export function MapsetStatus({ mapset }: { mapset: Mapset }) {
  const statusConfig = {
    approve: {
      name: "Tervalidasi",
      color: "bg-green-100 text-green-800",
      icon: <Check />,
    },
    on_validation: {
      name: "Menunggu Validasi",
      color: "bg-yellow-100 text-yellow-800",
      icon: <LoaderCircle />,
    },
    rejected: {
      name: "Mapset Ditolak",
      color: "bg-red-100 text-red-800",
      icon: <XIcon />,
    },
  };

  const config =
    statusConfig[
      (mapset.status_validation ?? "on_validation") as keyof typeof statusConfig
    ];

  return (
    <div
      className={`flex items-center gap-1 ${config.color} px-2 py-1 rounded-md`}
    >
      <span>{config.icon}</span>
      <span>{config.name}</span>
    </div>
  );
}
