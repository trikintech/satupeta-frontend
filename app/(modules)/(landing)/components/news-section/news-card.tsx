import { getFileUrl } from "@/shared/utils/file";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify"; // Pastikan sudah install: npm i isomorphic-dompurify

function truncateHtml(html: string, maxLength: number): string {
  const tempEl = document.createElement("div");
  tempEl.innerHTML = html;
  const textContent = tempEl.textContent || "";
  return textContent.length > maxLength
    ? textContent.slice(0, maxLength) + "..."
    : textContent;
}

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
  const safeHtml = DOMPurify.sanitize(truncateHtml(description, 300));

  return (
    <div className="relative flex flex-col gap-4 p-4 border border-slate-400 rounded-xl shadow-sm">
      {image && (
        <div className="relative w-full" style={{ height: 379 }}>
          <Image
            src={getFileUrl(image)}
            alt="news"
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}

      <div className="relative flex flex-col gap-4 pb-20">
        <h2 className="text-slate-700 text-2xl font-semibold leading-snug">
          {title}
        </h2>

        <div
          className="text-slate-500 text-sm"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      </div>
      <Link
        href={link}
        className="absolute left-4 bottom-4 text-primary flex items-center text-sm font-medium hover:underline"
      >
        Lihat selengkapnya
        <ArrowRight size={16} className="ml-1" />
      </Link>
    </div>
  );
}
