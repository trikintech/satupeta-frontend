"use client";

import { X } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/components/ui/tabs";
import { cn } from "@/shared/utils/utils";

export function DatasetDetailSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "absolute z-[400] top-0 right-0 h-full w-[480px] bg-white shadow-lg border-l  transition-transform duration-300",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="font-semibold text-lg">
          Peta Sebaran Alumni Pelatihan Petugas Pengambil Contoh Pangan
        </h2>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <Tabs defaultValue="informasi" className="w-full">
        <TabsList className="grid grid-cols-2 rounded-none w-full p-0 bg-none border">
          <TabsTrigger
            value="informasi"
            className="data-[state=active]:bg-primary rounded-none p-3 border-b-gray-200  bg-white  data-[state=active]:text-white"
          >
            Informasi Dataset Geospasial
          </TabsTrigger>
          <TabsTrigger
            value="penanggung"
            className="data-[state=active]:bg-primary data-[state=active]:border-t-gray-200 border-b-gray-200  rounded-none p-3 bg-white  data-[state=active]:text-white"
          >
            Penanggung Jawab
          </TabsTrigger>
        </TabsList>

        <TabsContent value="informasi" className="p-6 ">
          <div className="space-y-3 text-sm">
            <Row label="Klasifikasi" value=":" />
            <Row
              label="Deskripsi"
              value=": Berikut adalah data Landuse Citarum Hulu Di Provinsi Jawa Barat. Data ini dipublikasikan oleh Badan Penanggulangan Bencana Daerah."
            />
            <Row label="Sektoral" value=": Infrastruktur" />
            <Row label="Skala" value=": -" />
            <Row label="Cakupan Wilayah" value=": -" />
          </div>
        </TabsContent>

        <TabsContent value="penanggung" className="p-6">
          <p className="text-sm text-gray-600">
            Isi untuk Penanggung Jawab di sini...
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex">
      <span className="w-[160px] font-medium">{label}</span>
      <span className="flex-1">{value}</span>
    </div>
  );
}
