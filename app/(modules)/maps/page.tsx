import MapComponent from "./components/MapComponent";
import "leaflet/dist/leaflet.css";
import Sidebar from "./components/Sidebar";
import MapsetDialog from "./components/MapsetDialog";

export default function Maps() {
  return (
    <div className="h-screen relative">
      <Sidebar />
      <MapComponent />
      <MapsetDialog />
    </div>
  );
}
