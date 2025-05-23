import { appsName } from "@/shared/config/app-config";
import { CircleAlertIcon } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-sm leading-5 text-zinc-700 flex flex-col gap-3 ">
      <div>
        Temukan dataset geospasial dari berbagai perangkat daerah di{" "}
        {appsName.name} {appsName.wilayah}.
      </div>
      <div className="bg-white flex flex-col gap-2 p-3">
        <div className="text-red-700 flex items-center gap-2">
          <CircleAlertIcon size={12} /> Informasi
        </div>
        Klik &quot;Jelajahi Data&quot; untuk menelusuri dataset geospasial yang
        akan ditampilkan ke dalam peta.
      </div>
    </div>
  );
}
