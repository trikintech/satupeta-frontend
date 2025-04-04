import React, { useState, useCallback, memo } from "react";
import { Map, Layers, Plus, Minus } from "lucide-react";
import SearchInput from "@/shared/components/ds/SearchInput";

interface Mapset {
  id: string;
  name: string;
}

interface MapsetItemProps {
  mapset: Mapset;
  onClick: (id: string) => void;
  isSelected: boolean;
}

const MapsetItem: React.FC<MapsetItemProps> = memo(
  ({ mapset, onClick, isSelected }) => (
    <button
      className={`text-left bg-muted p-2 w-full rounded-lg flex justify-between items-center transition duration-200 ease-in-out cursor-pointer my-3 ${
        isSelected ? "border-l-4 border-primary" : "hover:bg-muted/80"
      }`}
      onClick={() => onClick(mapset.id)}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md">
          <Map size={18} className="text-primary" />
        </div>
        <div>
          <div className="text-gray-800 text-sm font-semibold tracking-wide">
            {mapset.name}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {isSelected ? (
          <Minus size={18} className="text-gray-400" />
        ) : (
          <Plus size={18} className="text-gray-400" />
        )}
      </div>
    </button>
  )
);

MapsetItem.displayName = "MapsetItem";

const MapsetList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMapsetId, setSelectedMapsetId] = useState<string | null>(null);

  const mapsets: Mapset[] = [
    {
      id: "mapset-1",
      name: "Peta Dasar Majalengka",
    },
    {
      id: "mapset-2",
      name: "Peta Topografi Bandung",
    },
    {
      id: "mapset-3",
      name: "Peta Infrastruktur Jakarta",
    },
    {
      id: "mapset-4",
      name: "Peta Administratif Surabaya",
    },
    {
      id: "mapset-5",
      name: "Peta Demografi Yogyakarta",
    },
  ];

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleAddLayer = useCallback((id: string) => {
    setSelectedMapsetId(id);
  }, []);

  const filteredMapsets = mapsets.filter((mapset) =>
    mapset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col h-full max-w-xl mx-auto bg-white rounded-l-lg shadow-lg">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg text-gray-800">Map Layers</h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {filteredMapsets.length} items
          </span>
        </div>
        <SearchInput onChange={handleSearch} placeholder="Search layers..." />
      </div>

      {filteredMapsets.length === 0 ? (
        <div className="flex h-[65vh] flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
          <Layers size={48} className="mb-2 opacity-50" />
          <p>No layers found matching &quot;{searchTerm}&quot;</p>
        </div>
      ) : (
        <div className="overflow-y-auto h-[65vh] pr-1">
          {filteredMapsets.map((mapset) => (
            <MapsetItem
              key={mapset.id}
              mapset={mapset}
              onClick={handleAddLayer}
              isSelected={mapset.id === selectedMapsetId}
            />
          ))}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 pt-2 border-t flex justify-between">
        <span>
          Showing {filteredMapsets.length} of {mapsets.length} available layers
        </span>
      </div>
    </div>
  );
};

export default MapsetList;
