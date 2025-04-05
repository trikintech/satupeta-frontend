import { useAtomValue } from "jotai";
import dynamic from "next/dynamic";
import { selectedMapsetAtom } from "../../../state/mapsetDialogAtom";
import EmptyState from "./EmptyState";
import { useState } from "react";

const PreviewMap = dynamic(() => import("./PreviewMap"), { ssr: false });

export default function MainDialog() {
  const selectedMapset = useAtomValue(selectedMapsetAtom);
  const [readmore, setReadmore] = useState(false);

  return (
    <div className="py-4 px-4 h-full flex flex-col gap-4">
      {selectedMapset ? (
        <div className="h-[75vh] mt-8 overflow-auto">
          <PreviewMap />
          <h3 className="font-bold text-2xl my-4">{selectedMapset?.name}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: selectedMapset?.description
                ? selectedMapset?.description
                : "",
            }}
            className={!readmore ? "line-clamp-5" : ""}
          ></p>
          {selectedMapset?.description.length > 200 &&
            (!readmore ? (
              <button
                className="cursor-pointer text-gray-500"
                onClick={() => setReadmore(true)}
              >
                Read More
              </button>
            ) : (
              <button
                className="cursor-pointer text-gray-500"
                onClick={() => setReadmore(false)}
              >
                Read Less
              </button>
            ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
