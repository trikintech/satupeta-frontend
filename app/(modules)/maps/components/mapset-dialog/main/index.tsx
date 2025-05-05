"use client";

import { useAtomValue } from "jotai";
import dynamic from "next/dynamic";
import { selectedMapsetAtom } from "../../../state/mapset-dialog";
import EmptyState from "./empty-state";
import { DatasetDetailSidebar } from "./dataset-detail-sidebar";
import { useEffect, useState } from "react";

const PreviewMap = dynamic(() => import("@/shared/components/preview-map"), {
  ssr: false,
});

export default function MainDialog() {
  const selectedMapset = useAtomValue(selectedMapsetAtom);
  const [open, setOpen] = useState(false);

  // Automatically open sidebar when mapset is selected
  useEffect(() => {
    if (selectedMapset) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selectedMapset]);

  return (
    <>
      {selectedMapset ? (
        <div className="relative h-full">
          <PreviewMap mapset={selectedMapset} isActiveControl={true} />
          <DatasetDetailSidebar
            open={open}
            onCloseAction={() => setOpen(false)}
            onOpenAction={() => setOpen(true)}
          />
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
}
