"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/components/ui/tabs";
import { cn } from "@/shared/utils/utils";
import { useAtomValue } from "jotai";
import { selectedMapsetAtom } from "../../../state/mapset-dialog";

export function DatasetDetailSidebar({
  open,
  onCloseAction,
  onOpenAction,
}: Readonly<{
  open: boolean;
  onCloseAction: () => void;
  onOpenAction: () => void;
}>) {
  const selectedMapset = useAtomValue(selectedMapsetAtom);

  if (!selectedMapset) return null;

  return (
    <div
      className={cn(
        "absolute z-[400] top-0 right-0 h-full w-[480px] bg-white shadow-lg border-l  transition-transform duration-300",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="relative flex items-center justify-between px-6 py-4 border-b">
        <h2 className="font-semibold text-lg">{selectedMapset.name}</h2>

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

        <TabsContent value="informasi" className="p-6">
          <div className="space-y-3 text-sm">
            <Row
              label="Klasifikasi"
              value={`: ${selectedMapset.classification.name}`}
            />
            <Row label="Deskripsi" value={`: ${selectedMapset.description}`} />
            <Row label="Kategori" value={`: ${selectedMapset.category.name}`} />
            <Row label="Skala" value={`: ${selectedMapset.scale}`} />
            <Row
              label="Status Data"
              value={`: ${selectedMapset.data_status}`}
            />
            <Row
              label="Periode Update"
              value={`: ${selectedMapset.data_update_period}`}
            />
            <Row
              label="Versi Data"
              value={`: ${selectedMapset.data_version}`}
            />
            <Row
              label="Sistem Proyeksi"
              value={`: ${selectedMapset.projection_system.name}`}
            />
            <Row
              label="Status Validasi"
              value={`: ${selectedMapset.status_validation}`}
            />
          </div>
        </TabsContent>

        <TabsContent value="penanggung" className="p-6">
          <div className="space-y-3 text-sm">
            <Row
              label="Nama Organisasi"
              value={`: ${selectedMapset.producer.name}`}
            />
            <Row
              label="Deskripsi"
              value={`: ${selectedMapset.producer.description}`}
            />
            <Row
              label="Alamat"
              value={`: ${selectedMapset.producer.address}`}
            />
            <Row
              label="Telepon"
              value={`: ${selectedMapset.producer.phone_number}`}
            />
            <Row label="Email" value={`: ${selectedMapset.producer.email}`} />
            <Row
              label="Website"
              value={`: ${selectedMapset.producer.website}`}
            />
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-medium mb-2">Sumber Data</h3>
              <Row
                label="Nama Sumber"
                value={`: ${selectedMapset.source.name}`}
              />
              <Row
                label="Deskripsi"
                value={`: ${selectedMapset.source.description}`}
              />
              <Row
                label="Kredensial"
                value={`: ${selectedMapset.source.credential.name}`}
              />
            </div>
          </div>
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
