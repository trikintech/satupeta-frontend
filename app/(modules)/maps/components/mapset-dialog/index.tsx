"use client";
import { useAtom } from "jotai";
import { isOpenMapsetDialogAtom } from "../../state/mapset-dialog";
import MapsetList from "./mapset-list";
import MainDialog from "./main";
import { useQueryParam, StringParam } from "use-query-params";
import { useEffect } from "react";
import { XIcon } from "lucide-react";
import TabSwitcher from "./tab-switcher";

export default function MapsetDialog() {
  const [isOpenDialog, setIsOpenDialog] = useAtom(isOpenMapsetDialogAtom);
  const [openCatalog] = useQueryParam("open-catalog", StringParam);
  const [tabParam] = useQueryParam("tab", StringParam);

  // Convert the query param to a valid tab type
  const initialTab =
    tabParam === "organization" || tabParam === "category"
      ? tabParam
      : undefined;

  useEffect(() => {
    if (openCatalog === "true") {
      setIsOpenDialog(true);
    }
  }, [openCatalog, setIsOpenDialog]);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-300 ${
        isOpenDialog
          ? "opacity-100 z-[404]"
          : "z-0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`h-full flex flex-col w-full transform transition-all duration-300 ${
          isOpenDialog ? "scale-100 opacity-100" : "z-0 scale-95 opacity-0"
        }`}
      >
        <div className="relative flex w-full bg-white border-b border-gray-200">
          <div className="w-[376px] px-3 py-1.5 h-full">
            <TabSwitcher initialTab={initialTab} />
          </div>

          <button
            className="absolute cursor-pointer text-zinc-400 right-4 top-4"
            onClick={() => setIsOpenDialog(false)}
          >
            <XIcon />
          </button>
        </div>

        <div className="flex h-[calc(100vh-117px)] w-full pointer-events-auto">
          <div className="w-[376px] bg-white">
            <MapsetList />
          </div>
          <div className="flex-1 bg-gray-50">
            <MainDialog />
          </div>
        </div>
      </div>
    </div>
  );
}
