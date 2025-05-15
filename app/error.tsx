// app/error.tsx atau app/some-path/error.tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error;
  reset: () => void;
}>) {
  useEffect(() => {
    toast.error(error.message || "Terjadi kesalahan.");
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white text-gray-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary mb-4">Error</h1>
        <h2 className="text-2xl font-semibold mb-2">Terjadi Kesalahan</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi atau
          kembali ke beranda.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition duration-200"
          >
            Coba Lagi
          </button>
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded transition duration-200"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
