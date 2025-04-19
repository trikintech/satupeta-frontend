import { CatalogSection } from "./(modules)/(landing)/components/catalog-section";
import { Header } from "./(modules)/(landing)/components/layout/header";
import { HeroSection } from "./(modules)/(landing)/components/hero-section";
import { StatisticsSection } from "./(modules)/(landing)/components/statistic-section";
import { NewsSection } from "./(modules)/(landing)/components/news-section";
import Footer from "./(modules)/(landing)/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <HeroSection />
        <CatalogSection />
        <StatisticsSection />
        <NewsSection />
      </div>
      <Footer />
    </main>
  );
}
