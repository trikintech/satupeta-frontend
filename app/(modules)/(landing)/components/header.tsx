"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/shared/utils/utils";
import { Button } from "@/shared/components/ds/button";

const navigation = [
  { name: "Katalog Mapset", href: "/katalog" },
  { name: "Daftar OPD", href: "/opd" },
  { name: "Statistik Konten", href: "/statistik" },
  { name: "Berita dan Pengumuman", href: "/berita" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 bg-zinc-50 z-50 transition-all duration-300 border-b border-zinc-200 text-slate-800",
        isScrolled ? "py-3 shadow-sm" : "py-3"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Satu Peta"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <div className="mx-4 h-8 w-px bg-zinc-200" />
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary font-medium text-sm transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <Button variant="primary" size="sm" className="ml-4">
              Login
            </Button>
            <Button variant="outline" size="icon" className="ml-2 md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
