"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { mapAtom } from "../../state/map";
import { useAtom } from "jotai";

export default function ZoomControl() {
  const [map] = useAtom(mapAtom);

  return (
    <div className="cursor-pointer flex flex-col items-center bg-primary text-primary-foreground rounded-lg shadow-md text-md">
      <button
        id="zoomIn"
        onClick={() => map?.zoomIn()}
        className="cursor-pointer p-2 rounded-full transition-all"
      >
        <PlusIcon size={18} />
      </button>

      <button
        id="zoomOut"
        onClick={() => map?.zoomOut()}
        className="cursor-pointer p-2 rounded-full transition-all "
      >
        <MinusIcon size={18} />
      </button>
    </div>
  );
}
