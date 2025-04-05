import { useAtomValue } from "jotai";
import dynamic from "next/dynamic";
import { selectedMapsetAtom } from "../../../state/mapsetDialogAtom";

const PreviewMap = dynamic(() => import("./PreviewMap"), { ssr: false });

export default function MainDialog() {
  const selectedMapset = useAtomValue(selectedMapsetAtom);

  return (
    <div className="py-12 px-4 flex flex-col gap-4">
      <PreviewMap />
      <h3 className="font-bold text-2xl">{selectedMapset?.name}</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: selectedMapset?.description
            ? selectedMapset?.description
            : "",
        }}
      ></p>
    </div>
  );
}
