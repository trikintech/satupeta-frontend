import { CatalogSection } from "./(modules)/(landing)/components/catalog-section";
import { Header } from "../shared/components/layout/header";
import { HeroSection } from "./(modules)/(landing)/components/hero-section";
import { StatisticsSection } from "./(modules)/(landing)/components/statistic-section";
import { NewsSection } from "./(modules)/(landing)/components/news-section";
import Footer from "./(modules)/(landing)/components/layout/footer";
import { OrganizationSection } from "./(modules)/(landing)/components/organization-section";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow mb-36">
        <HeroSection />
        <CatalogSection />
        <OrganizationSection />
        <StatisticsSection />
        <NewsSection />
      </div>
      <Footer />
    </main>
  );
}
