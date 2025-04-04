import MapComponent from "./components/MapComponent";
import "leaflet/dist/leaflet.css";
import Sidebar from "./components/Sidebar/Sidebar";
import MapsetDialog from "./components/MapsetDialog/MapsetDialog";

export default function Maps() {
  return (
    <div className="h-screen relative">
      <Sidebar />
      <MapComponent />
      <MapsetDialog />
    </div>
  );
}
