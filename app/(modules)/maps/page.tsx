import MapComponent from "./components/MapComponent";
import "leaflet/dist/leaflet.css";
import Sidebar from "./components/Sidebar";
import MapsetDialog from "./components/MapsetDialog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maps Portal",
  description: "Portal to view and analyze data geospatial",
};

export default function Maps() {
  return (
    <div className="h-screen relative">
      <Sidebar />
      <MapComponent />
      <MapsetDialog />
    </div>
  );
}
