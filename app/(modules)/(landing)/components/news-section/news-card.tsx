import { getFileUrl } from "@/shared/utils/file";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewsCard({
  title,
  description,
  link,
  image,
}: {
  title: string;
  description: string;
  link: string;
  image?: string;
}) {
  return (
    <div className="gap-4 p-4 border border-[#94A3B8] flex flex-col">
      {image && (
        <Image
          src={getFileUrl(image)}
          alt="news"
          width={379}
          height={379}
          className="w-full"
        />
      )}
      <div className="relative flex flex-col gap-4 pb-20">
        <div className="text-slate-600 leading-9 text-3xl ">{title}</div>

        <div className="text-slate-500 text-sm pt-12">{description}</div>

        <Link
          href={link}
          className="absolute left-0 bottom-0 text-primary flex items-center text-sm font-medium hover:underline"
        >
          Lihat selengkapnya
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
}
