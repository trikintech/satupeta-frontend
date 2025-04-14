import { CatalogSection } from "./(modules)/(landing)/components/catalog-section";
import { Footer } from "./(modules)/(landing)/components/footer";
import { Header } from "./(modules)/(landing)/components/header";
import { HeroSection } from "./(modules)/(landing)/components/hero-section";
import { StatisticsSection } from "./(modules)/(landing)/components/statistic-section";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <HeroSection />
        <CatalogSection />
        <StatisticsSection />
        {/* Tambahkan section Berita dan Pengumuman jika diperlukan */}
      </div>
      <Footer />
    </main>
  );
}
