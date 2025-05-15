import { CatalogSection } from "./(modules)/(landing)/components/catalog-section";
import { Header } from "../shared/components/layout/header";
import { HeroSection } from "./(modules)/(landing)/components/hero-section";
import { StatisticsSection } from "./(modules)/(landing)/components/statistic-section";
import { NewsSection } from "./(modules)/(landing)/components/news-section";
import Footer from "../shared/components/layout/footer";
import { OrganizationSection } from "./(modules)/(landing)/components/organization-section";
import { appsName, isActiveFeature } from "@/shared/config/app-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${appsName.name} ${appsName.wilayah}`,
  description: `Portal geospasial resmi ${appsName.wilayah} untuk akses data spasial yang akurat, terkini, dan mendukung pengambilan keputusan berbasis lokasi.`,
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow mb-36">
        <HeroSection />
        <CatalogSection />
        <OrganizationSection />
        <StatisticsSection />

        {isActiveFeature.news && <NewsSection />}
      </div>
      <Footer />
    </main>
  );
}
