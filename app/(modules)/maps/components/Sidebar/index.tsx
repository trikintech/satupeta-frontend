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
    <div className="absolute top-[61px] left-0 h-[93%] flex items-center z-[403]">
      <div
        className={`relative h-full my-auto flex flex-col bg-white shadow-lg border border-gray-300 transition-[width] duration-300 ease-out ${
          isOpen ? "w-100" : "w-0 border-0"
        }`}
      >
        <div
          className={`flex flex-col gap-2 transition-opacity duration-200 ${
            isOpen ? "opacity-100 delay-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col gap-3 p-8">
            <SearchInput
              value={input}
              onChange={(val) => handleChange(val)}
              placeholder="Cari Lokasi/Dataset"
            />
            <Button onClick={() => setIsOpenDialog(true)}>Jelajahi Data</Button>
          </div>
          <hr />

          <LayerControls />
          <div className="absolute -right-9">
            <CloseTrigger onClose={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
      <div
        className={`absolute transition-all duration-300 ease-out top-4 ${
          isOpen ? "opacity-0 -translate-x-4" : "opacity-100 left-4"
        }`}
      >
        <OpenTrigger onOpen={() => setIsOpen(true)} />
      </div>
    </div>
  );
}
