import { useQuery } from "@tanstack/react-query";
import historyApi from "@/shared/services/history";
import { History } from "@/shared/types/history";
import { StatusValidationBadge } from "@/shared/components/status-validation-badge";
import { formatIndonesianDate } from "@/shared/utils/date";

export default function MapsetHistory({ id }: { id: string }) {
  const { data: historyData, isLoading } = useQuery({
    queryKey: ["histories"],
    queryFn: () => historyApi.getHistories({ filter: [`mapset_id=${id}`] }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Riwayat Mapset</h2>

      <table className="w-full border-separate border-spacing-0 border border-zinc-200 rounded-lg text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left font-medium border-b border-zinc-200 w-[200px]">
              Tanggal
            </th>
            <th className="px-4 py-2 text-left font-medium border-b border-zinc-200 w-[200px]">
              User
            </th>
            <th className="px-4 py-2 text-left font-medium border-b border-zinc-200 w-[200px]">
              Aksi
            </th>
            <th className="px-4 py-2 text-left font-medium border-b border-zinc-200 min-w-[300px]">
              Catatan
            </th>
          </tr>
        </thead>
        <tbody>
          {historyData?.items.map((history: History) => (
            <tr key={history.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b border-zinc-200 whitespace-nowrap">
                {formatIndonesianDate(history.timestamp)}
              </td>
              <td className="px-4 py-2 border-b border-zinc-200 whitespace-nowrap">
                {history.user.name}
              </td>
              <td className="px-4 py-2 border-b border-zinc-200 whitespace-nowrap">
                <StatusValidationBadge
                  status={
                    history.validation_type as
                      | "approved"
                      | "on_verification"
                      | "rejected"
                  }
                />
              </td>
              <td className="px-4 py-2 border-b border-zinc-200">
                {history.notes || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
