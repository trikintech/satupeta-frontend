// components/ui/search-input.tsx
"use client";

import { Search } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { Input, InputProps } from "@/shared/components/ds/input";

export function SearchInput({ className, ...props }: InputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input type="search" className="pl-9" {...props} />
    </div>
  );
}
