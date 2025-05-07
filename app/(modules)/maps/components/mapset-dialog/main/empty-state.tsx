import Image from "next/image";

export default function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center gap-8 mx-auto my-auto">
        <Image
          src="/empty-mapset.png"
          alt="select mapset"
          width={190}
          height={190}
        />
        <div className="w-[277px] flex flex-col gap-6 items-center text-center">
          <div className="text-xl font-bold">Mohon Maaf!</div>
          <div className="text-sm">
            Dataset yang Anda cari tidak ditemukan, mohon periksa kembali kata
            kunci Anda.
          </div>
        </div>
      </div>
    </div>
  );
}
