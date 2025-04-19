"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ds/input";
import { Button } from "@/shared/components/ds/button";
import { useState } from "react";

export default function HeroSearchInput() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    if (input) searchParams.set("query", input);
    searchParams.set("open-catalog", "true");

    router.push(`/maps?${searchParams.toString()}`);
  };

  return (
    <div className="relative max-w-xl h-[52px]">
      <Input
        type="text"
        placeholder="Masukkan kata kunci..."
        className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full h-[52px]"
        value={input}
        onChange={handleChange}
      />
      <Button
        className="absolute right-2 top-2 bottom-2 h-9 bg-primary hover:bg-primary-hover cursor-pointer"
        onClick={handleSearch}
      >
        Search
      </Button>
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
    </div>
  );
}
