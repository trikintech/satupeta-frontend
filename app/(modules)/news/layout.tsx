import Footer from "@/shared/components/layout/footer";
import { Header } from "@/shared/components/layout/header";
import { appsName } from "@/shared/config/app-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${appsName.name} ${appsName.wilayah}`,
  description: `Dapatkan berita terbaru dan pengumuman resmi terkait pengelolaan data geospasial ${appsName.wilayah}. Temukan informasi terkini yang mendukung transparansi dan pengambilan keputusan berbasis lokasi.`,
};

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow mb-36 pt-30">{children}</div>
      <Footer />
    </main>
  );
}
