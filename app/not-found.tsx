// pages/404.tsx
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white text-gray-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        </p>

        <Link
          href="/"
          className="inline-block bg-primary hover:bg-primary text-white font-medium py-2 px-4 rounded transition duration-200"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
