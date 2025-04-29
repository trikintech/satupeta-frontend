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
      className={`absolute inset-0 flex items-center justify-center  transition-opacity duration-300 ${
        isOpenDialog
          ? "opacity-100 z-[404]"
          : "z-0 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={` w-full h-full max-h-full transform transition-all duration-300 ${
          isOpenDialog ? "scale-100 opacity-100" : "z-0 scale-95 opacity-0"
        }`}
      >
        <div className="flex w-full h-full relative pointer-events-auto">
          <div className="w-2/5 bg-gray-50 h-full">
            <MapsetList />
          </div>
          <div className="w-3/5 bg-gray-50">
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
