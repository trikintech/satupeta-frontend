"use client";

import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import { Providers } from "@/shared/providers";
import { Toaster } from "@/shared/components/ui/sonner";
import { appsName } from "@/shared/config/app-config";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "sans-serif"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${geistSans.variable} ${interSans.variable} font-sans antialiased`}
      >
        <head>
          <title>{`Satu Peta ${appsName.wilayah}`}</title>
        </head>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
