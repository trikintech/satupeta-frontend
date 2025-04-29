"use client";

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { cn } from "@/shared/utils/utils";

const datasets = [
  {
    title: "Peta Sebaran Alumni Pelatihan Petugas Pengambil Contoh Pangan",
    isBold: true,
  },
  {
    title:
      "Sebaran Perizinan Berusaha Terverifikasi Kewenangan Provinsi Tahun 2021",
  },
  {
    title:
      "Sebaran Perizinan Berusaha Terbit Otomatis Kewenangan Provinsi Tahun 2022",
  },
];

export default function DatasetSection() {
  const [open, setOpen] = useState(true);

  return (
    <div className="text-gray-900 text-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left font-medium"
      >
        <span className="text-gray-700">Ekonomi</span>
        <ChevronDown
          className={cn("h-5 w-5 transition-transform", {
            "rotate-180": open,
          })}
        />
      </button>

      {open && (
        <div className="pl-2 relative">
          <ul className="mt-2 border-l px-6 space-y-3">
            {datasets.map((item, idx) => (
              <li key={idx} className="flex justify-between items-start">
                <span
                  className={cn(
                    "text-sm",
                    item.isBold ? "font-semibold text-black" : "text-gray-700"
                  )}
                >
                  {item.title}
                </span>
                <Plus className="absolute right-2 w-4 h-4 mt-1 text-gray-500" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
