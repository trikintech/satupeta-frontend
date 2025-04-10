import { useAtomValue } from "jotai";
import dynamic from "next/dynamic";
import { selectedMapsetAtom } from "../../../state/mapset-dialog";
import EmptyState from "./EmptyState";
import DescriptionSection from "./DescriptionSection";
import { LayerToggle } from "./LayerToggle";

const PreviewMap = dynamic(() => import("./PreviewMap"), { ssr: false });

export default function MainDialog() {
  const selectedMapset = useAtomValue(selectedMapsetAtom);

  return (
    <div className="py-4 px-4 h-full flex flex-col gap-4">
      {selectedMapset ? (
        <div className="h-[75vh] mt-8 overflow-auto">
          <div className="relative">
            <PreviewMap mapset={selectedMapset} />
            <LayerToggle mapset={selectedMapset} />
          </div>
          <h3 className="font-bold text-2xl my-4">{selectedMapset?.name}</h3>
          <DescriptionSection description={selectedMapset?.description} />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
