import MapComponent from "./components/map-component";
import MapsetDialog from "./components/mapset-dialog";
import { Metadata } from "next";
import FeatureInformation from "./components/feature-information";
import { Header } from "@/shared/components/layout/header";

export const metadata: Metadata = {
  title: "Maps Portal",
  description: "Portal to view and analyze data geospatial",
};

export default function Maps() {
  return (
    <div className="h-screen relative">
      <Header />
      <MapComponent />
      <MapsetDialog />
      <FeatureInformation />
    </div>
  );
}
