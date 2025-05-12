import React from "react";

type Status = "approved" | "on_verification" | "rejected";

const statusMap: Record<Status, { label: string; color: string }> = {
  approved: { label: "Disetujui", color: "bg-green-100 text-green-800" },
  on_verification: {
    label: "Menunggu Verifikasi",
    color: "bg-yellow-100 text-yellow-800",
  },
  rejected: { label: "Ditolak", color: "bg-red-100 text-red-800" },
};

export const StatusValidationBadge = ({ status }: { status: Status }) => {
  const { label, color } = statusMap[status];
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${color}`}>
      {label}
    </span>
  );
};
