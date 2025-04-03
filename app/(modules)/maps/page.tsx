import MapComponent from "./components/MapComponent";
import "leaflet/dist/leaflet.css";
import Sidebar from "./components/Sidebar/Sidebar";

export default function Maps() {
  return (
    <div>
      <Sidebar />
      <MapComponent />
    </div>
  );
}
