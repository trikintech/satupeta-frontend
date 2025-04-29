import { useState } from "react";

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState<"kategori" | "organisasi">(
    "kategori"
  );

  return (
    <div className="p-1 bg-gray-100 rounded-lg grid grid-cols-2 w-full text-sm">
      <button
        onClick={() => setActiveTab("kategori")}
        className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
          activeTab === "kategori" ? "bg-white text-blue-500" : "text-gray-700"
        }`}
      >
        Kategori
      </button>
      <button
        onClick={() => setActiveTab("organisasi")}
        className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
          activeTab === "organisasi"
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
