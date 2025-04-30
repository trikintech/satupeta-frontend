"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/components/ui/tabs";
import { cn } from "@/shared/utils/utils";

export function DatasetDetailSidebar({
  open,
  onCloseAction,
  onOpenAction,
}: {
  open: boolean;
  onCloseAction: () => void;
  onOpenAction: () => void;
}) {
  return (
    <div
      className={cn(
        "absolute z-[400] top-0 right-0 h-full w-[480px] bg-white shadow-lg border-l  transition-transform duration-300",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="relative flex items-center justify-between px-6 py-4 border-b">
        <h2 className="font-semibold text-lg">
          Peta Sebaran Alumni Pelatihan Petugas Pengambil Contoh Pangan
        </h2>

        <button
          className="bg-slate-100 border-zinc-400 absolute top-4 w-6 h-6 -left-8 flex rounded-lg items-center justify-center cursor-pointer"
          onClick={() => (open ? onCloseAction() : onOpenAction())}
        >
          {open ? (
            <Maximize2 className="w-4 h-4 text-sky-900" />
          ) : (
            <Minimize2 className="w-4 h-4 text-sky-900" />
          )}
        </button>
      </div>

      <Tabs defaultValue="informasi" className="w-full">
        <TabsList className="grid grid-cols-2 rounded-none w-full p-0 h-auto bg-white border-b border-gray-200">
          <TabsTrigger
            value="informasi"
            className="data-[state=active]:text-white data-[state=active]:bg-primary data-[state=active]:border-t border-primary h-full border-0  rounded-none p-3"
          >
            Informasi Dataset Geospasial
          </TabsTrigger>
          <TabsTrigger
            value="penanggung"
            className="data-[state=active]:text-white data-[state=active]:bg-primary h-full  rounded-none p-3"
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
