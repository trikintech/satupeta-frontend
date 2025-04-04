"use client";
import { useAtom } from "jotai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { isOpenMapsetDialogAtom } from "../../state/mapsetDialogAtom";
import MapsetList from "./MapsetList";
import MainDialog from "./MainDialog";

export default function MapsetDialog() {
  const [isOpenDialog, setIsOpenDialog] = useAtom(isOpenMapsetDialogAtom);

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogOverlay className="z-[403] bg-transparent"></DialogOverlay>
      <DialogContent className="z-[404] p-0 lg:max-w-5xl 2xl:max-w-6xl 2xl:left-[60%] xl:max-w-4xl xl:left-[63%] border-0">
        <DialogHeader className="gap-0">
          <DialogTitle />
          <div className="flex">
            <div className="w-2/5 rounded-l-lg bg-gray-50">
              <MapsetList />
            </div>
            <div className="w-3/5 rounded-r-lg">
              <MainDialog />
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
