import { useAtom } from "jotai";
import { activeTabAtom } from "../../state/active-tab";

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  return (
    <div className="p-1 bg-gray-100 rounded-lg grid grid-cols-2 w-full text-sm">
      <button
        onClick={() => setActiveTab("category")}
        className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
          activeTab === "category" ? "bg-white text-blue-500" : "text-gray-700"
        }`}
      >
        Kategori
      </button>
      <button
        onClick={() => setActiveTab("organization")}
        className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
          activeTab === "organization"
            ? "bg-white text-blue-500"
            : "text-gray-700"
        }`}
      >
        Organisasi
      </button>
    </div>
  );
};

export default TabSwitcher;
