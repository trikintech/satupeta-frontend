import { ChoroplethIcon, MapIcon } from "@/shared/components/icons";

export default function ChoroplethControl() {
  return (
    <div className="bg-zinc-100 p-1 grid grid-cols-2">
      <div className="bg-white cursor-pointer rounded-md flex flex-col gap-1 justify-center items-center text-sm text-zinc-950 py-2 px-3">
        <MapIcon size={32} />
        Basic
      </div>
      <div className="bg-white cursor-pointer rounded-md flex flex-col gap-1 justify-center items-center text-sm text-zinc-950 py-2 px-3">
        <ChoroplethIcon size={32} />
        Choropleth
      </div>
    </div>
  );
}
