import { CardProps } from "@/shared/components/ds/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function OpdCard({
  href,
  title,
  className,
  ...props
}: Readonly<Omit<CardProps, "image" | "tag" | "description">>) {
  return (
    <Link href={href ?? "#"} passHref>
      <div
        className={`block p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors group ${
          className ?? ""
        }`}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">{title}</span>
          <div className="h-6 w-6 rounded-full bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
