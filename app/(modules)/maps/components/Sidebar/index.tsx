"use client";

import { useEffect, useState } from "react";
import OpenTrigger from "./open-trigger";
import SearchInput from "@/shared/components/search-input";
import CloseTrigger from "./close-trigger";
import { Button } from "@/shared/components/ui/button";
import { useSetAtom } from "jotai";
import { isOpenMapsetDialogAtom } from "../../state/mapset-dialog";
import dynamic from "next/dynamic";
import { useQueryParam, StringParam } from "use-query-params";

const LayerControls = dynamic(() => import("./layer-controls"), {
  ssr: false,
});

const DrawingTools = dynamic(() => import("./drawing-tools"), {
  ssr: false,
});

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const setIsOpenDialog = useSetAtom(isOpenMapsetDialogAtom);
  const [openCatalog] = useQueryParam("open-catalog", StringParam);
  const [, setQuery] = useQueryParam("query", StringParam);
  const [input, setInput] = useState("");

  const handleChange = (val: string) => {
    setInput(val);
    setQuery(val);
  };

  useEffect(() => {
    if (openCatalog === "true") {
      setIsOpen(true);
    }
  }, [openCatalog]);

  return (
    <div className="relative h-full z-[403] w-[320px]">
      <div
        className={`relative h-full flex flex-col bg-zinc-50 shadow-lg border border-gray-300 transition-[width] duration-300 ease-out ${
          isOpen ? "w-[320px]" : "w-0 border-0"
        }`}
      >
        <div
          className={`flex flex-col gap-2 h-full transition-opacity duration-200 ${
            isOpen ? "opacity-100 delay-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col gap-3 p-6 border-b border-gray-200">
            <SearchInput
              value={input}
              onChange={(val) => handleChange(val)}
              placeholder="Cari Lokasi/Dataset"
            />
            <Button onClick={() => setIsOpenDialog(true)}>Jelajahi Data</Button>
          </div>
          <div className="p-6 border-b border-gray-200 text-sm">
            <DrawingTools />
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <LayerControls />
          </div>
          <div className="absolute -right-9 top-8">
            <CloseTrigger onClose={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
      {/* Tombol buka */}
      <div
        className={`absolute transition-all duration-300 ease-out top-4 left-4 ${
          isOpen
            ? "opacity-0 -translate-x-4 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <OpenTrigger onOpen={() => setIsOpen(true)} />
      </div>
    </div>
  );
}
