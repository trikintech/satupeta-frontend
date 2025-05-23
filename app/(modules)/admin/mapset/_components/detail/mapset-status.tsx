import StatusValidation from "@/shared/config/status-validation";
import { Mapset } from "@/shared/types/mapset";
import { Check, LoaderCircle, XIcon } from "lucide-react";
import { JSX } from "react";

export function MapsetStatus({ mapset }: { mapset: Mapset }) {
  const statusConfig: Record<
    StatusValidation,
    { name: string; color: string; icon: JSX.Element }
  > = {
    [StatusValidation.APPROVED]: {
      name: "Tervalidasi",
      color: "text-green-800",
      icon: <Check />,
    },
    [StatusValidation.ON_VERIFICATION]: {
      name: "Menunggu Validasi",
      color: "text-yellow-700",
      icon: <LoaderCircle className="h-4" />,
    },
    [StatusValidation.REJECTED]: {
      name: "Mapset Ditolak",
      color: "text-red-800",
      icon: <XIcon />,
    },
  };

  const config =
    statusConfig[
      (mapset.status_validation ??
        StatusValidation.ON_VERIFICATION) as StatusValidation
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
