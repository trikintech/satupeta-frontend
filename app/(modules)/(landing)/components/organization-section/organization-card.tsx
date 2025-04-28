import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OrganizationCard({
  name = "Dinas Komunikasi dan Informatika",
  link = "/statistik/mapset",
  totalDataset = 10,
}: {
  name: string;
  link: string;
  totalDataset: number;
}) {
  return (
    <div className="relative h-full">
      <div
        className="absolute inset-0 z-0 bg-[url('/pattern-01.png')] opacity-50 bg-[length:120%]"
        aria-hidden="true"
      />
      <div className="relative border gap-16 border-[#94A3B8] p-4 flex flex-col justify-between h-full">
        <div>
          <p className="text-slate-600 mb-4 text-4xl">{name}</p>
        </div>
        <div className="flex items-end">
          <div className="text-2xl text-slate-500">{totalDataset} Dataset</div>
          <Link
            href={link}
            className="ml-auto text-primary text-sm font-medium hover:underline"
          >
            <ArrowRight size={24} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
