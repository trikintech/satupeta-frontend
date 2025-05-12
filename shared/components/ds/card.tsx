import * as React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  image?: string;
  tag?: string;
  title: string;
  description?: string;
}

export function Card({
  href,
  image,
  tag,
  title,
  description,
  className,
  ...props
}: Readonly<CardProps>) {
  const componentProps = href ? { href } : {};

  return (
    <div
      {...componentProps}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md",
        className
      )}
      {...props}
    >
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {tag && (
            <div className="absolute top-3 right-3 bg-secondary text-gray-800 text-xs font-medium px-2 py-1 rounded">
              {tag}
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-zinc-700 line-clamp-2 mb-3">
            {description}
          </p>
        )}
        {href && (
          <div className="flex items-center text-primary text-sm font-medium">
            <span>Lihat selengkapnya</span>
            <ChevronRight
              size={16}
              className="ml-1 transition-transform group-hover:translate-x-1"
            />
          </div>
        )}
      </div>
    </div>
  );
}
