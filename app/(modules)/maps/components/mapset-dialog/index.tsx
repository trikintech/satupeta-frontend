"use client";
import { useAtom } from "jotai";
import { isOpenMapsetDialogAtom } from "../../state/mapset-dialog";
import MapsetList from "./mapset-list";
import MainDialog from "./main";
import { useQueryParam, StringParam } from "use-query-params";
import { useEffect } from "react";
import { XIcon } from "lucide-react";

export default function MapsetDialog() {
  const [isOpenDialog, setIsOpenDialog] = useAtom(isOpenMapsetDialogAtom);
  const [openCatalog] = useQueryParam("open-catalog", StringParam);

  useEffect(() => {
    if (openCatalog === "true") {
      setIsOpenDialog(true);
    }
  }, [openCatalog, setIsOpenDialog]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isOpenDialog
          ? "opacity-100 pointer-events-auto z-[404]"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-gray-50 shadow-lg w-full max-w-5xl h-full max-h-full transform transition-all duration-300 ${
          isOpenDialog ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex w-full h-full relative">
          <div className="w-2/5 rounded-l-lg bg-gray-50 h-full">
            <MapsetList />
          </div>
          <div className="w-3/5 rounded-r-lg">
            <MainDialog />
          </div>
          <button
            className="absolute cursor-pointer right-4 top-4"
            onClick={() => setIsOpenDialog(false)}
          >
            <XIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
