"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";

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
            <div className="relative h-[24px] w-[120px]">
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                className="dark:invert object-contain"
                priority
              />
            </div>
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
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden transition-all hover:shadow-md">
          <div className="p-3">
            <div className="w-[120px] h-[24px] relative">
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                className="dark:invert object-contain"
                priority
              />
            </div>
          </div>
          <Button
            variant="default"
            size="lg"
            onClick={() => setIsOpen(true)}
            className="w-full rounded-t-none"
          >
            Show Workbench
            <ChevronRight className="h-5 w-5 shrink-0 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
