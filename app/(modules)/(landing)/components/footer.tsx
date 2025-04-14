// src/components/layout/footer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Instagram } from "lucide-react";

type FooterLink = {
  name: string;
  href: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
};

type FooterLinkGroup = {
  title: string;
  links: FooterLink[];
};

const footerLinks: FooterLinkGroup[] = [
  {
    title: "Discover",
    links: [
      { name: "Katalog Mapset", href: "/katalog" },
      { name: "Berita dan Pengumuman", href: "/berita" },
      { name: "Statistik Konten", href: "/statistik" },
      { name: "Daftar OPD", href: "/opd" },
    ],
  },
  {
    title: "About Satu Peta",
    links: [
      { name: "Careers", href: "/karir" },
      { name: "About", href: "/tentang" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
      { name: "Twitter", href: "https://twitter.com", icon: Twitter },
      { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-background-dark text-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-start mb-6">
              <Image
                src="/logo-satu-peta-white.svg"
                alt="Satu Peta"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Peta terpadu untuk data spasial Indonesia yang dapat diakses
              publik untuk perencanaan dan pengembangan
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      {link.icon && <link.icon size={16} className="mr-2" />}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Satu Peta. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-400 text-sm">UPT GCNT DISKOMINFO</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
