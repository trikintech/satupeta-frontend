import MapComponent from "./components/map-component";
import MapsetDialog from "./components/mapset-dialog";
import { Metadata } from "next";
import FeatureInformation from "./components/feature-information";
import { Header } from "@/shared/components/layout/header";
import Sidebar from "./components/sidebar";

export const metadata: Metadata = {
  title: "Maps Portal",
  description: "Portal to view and analyze data geospatial",
};

export default function Maps() {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="pt-16 flex h-full flex-col">
        <div className="flex flex-1 overflow-hidden">
          <div className="relative flex-1 overflow-hidden">
            <Sidebar />
            <MapComponent />
            <MapsetDialog />
            <FeatureInformation />
          </div>
        </div>
      </div>
    </div>
  );
}
