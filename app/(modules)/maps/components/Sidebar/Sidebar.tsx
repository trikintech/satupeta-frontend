"use client";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import OpenTrigger from "./OpenTrigger";
import LogoImage from "./LogoImage";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-0 left-4 h-full flex items-center z-[403]">
      <div
        className={`relative h-[97%] my-auto flex flex-col bg-white shadow-lg border border-gray-300 rounded-lg transition-[width] duration-300 ease-out ${
          isOpen ? "w-80" : "w-0 border-0"
        }`}
      >
        <div
          className={`p-4 flex-1 flex flex-col transition-opacity duration-200 ${
            isOpen ? "opacity-100 delay-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-center">
            <LogoImage />
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </Button>
        </div>
      </div>
      <div
        className={`absolute transition-all duration-300 ease-out top-4 ${
          isOpen ? "opacity-0 -translate-x-4" : "opacity-100 left-4"
        }`}
      >
        <OpenTrigger onOpen={() => setIsOpen(true)} />
      </div>
    </div>
  );
}
