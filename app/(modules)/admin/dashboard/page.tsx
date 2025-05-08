"use client";

import { useAuthSession } from "@/shared/hooks/use-session";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    router.replace("/auth/admin/login");
    return null;
  }

  return (
    <div className="p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Selamat Datang di Satu Peta Jatim
        </h1>
        <p className="text-xl text-muted-foreground">
          Portal Informasi Geospasial Jawa Timur
        </p>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg">
            Platform terpadu untuk mengelola dan memvisualisasikan data
            geografis Jawa Timur. Bersama kita wujudkan Jawa Timur yang lebih
            terintegrasi dan informatif.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">
            Statistik
          </h3>
          <p className="text-gray-600">
            Pantau perkembangan dan analisis data geografis Jawa Timur secara
            real-time
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-green-800">
            Kelola Data
          </h3>
          <p className="text-gray-600">
            Kelola dan perbarui data geografis dengan mudah dan efisien
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-purple-800">
            Keamanan
          </h3>
          <p className="text-gray-600">
            Sistem keamanan terpadu untuk melindungi data geografis Jawa Timur
          </p>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-green-50 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Fitur Unggulan
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                Visualisasi Data Real-time
              </h4>
              <p className="text-sm text-gray-600">
                Pantau perubahan data geografis secara langsung
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-1">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Analisis Terpadu</h4>
              <p className="text-sm text-gray-600">
                Analisis data geografis dengan berbagai parameter
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Kolaborasi Tim</h4>
              <p className="text-sm text-gray-600">
                Kerja sama tim yang efisien dalam pengelolaan data
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-1">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">
                Layanan Peta Terintegrasi
              </h4>
              <p className="text-sm text-gray-600">
                Kelola peta dari berbagai sumber data
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
