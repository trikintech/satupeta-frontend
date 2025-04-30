import React, { useState, useCallback, useEffect } from "react";
import { Map, Layers, Plus, Minus } from "lucide-react";
import SearchInput from "@/shared/components/search-input";
import { mapsets as rawMapsets } from "@/shared/utils/mapsets";
import { useAtom } from "jotai";
import { selectedMapsetAtom } from "../../../state/mapset-dialog";
import { useLayerToggle } from "../../../hooks/useLayerToggle";
import { Mapset } from "@/shared/types/mapset";
import { useQueryParam, StringParam } from "use-query-params";
import DatasetSection from "./dataset-section";

interface MapsetItemProps {
  mapset: Mapset;
  onClick: (mapset: Mapset) => void;
  isSelected: boolean;
}

const MapsetItem: React.FC<MapsetItemProps> = ({
  mapset,
  onClick,
  isSelected,
}) => {
  const { isActiveLayer, toggleLayer } = useLayerToggle(mapset);

  return (
    <button
      className={`text-left bg-muted p-2 w-full rounded-lg flex justify-between items-center transition duration-200 ease-in-out cursor-pointer my-3 ${
        isSelected ? "border-l-4 border-primary" : "hover:bg-muted/80"
      }`}
      onClick={() => onClick(mapset)}
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
        {isActiveLayer ? (
          <Minus size={18} className="text-gray-400" onClick={toggleLayer} />
        ) : (
          <Plus size={18} className="text-gray-400" onClick={toggleLayer} />
        )}
      </div>
    </button>
  );
};

MapsetItem.displayName = "MapsetItem";

const MapsetList: React.FC = () => {
  const [query, setQuery] = useQueryParam("query", StringParam);
  const [searchTerm, setSearchTerm] = useState(query || "");

  useEffect(() => {
    setSearchTerm(query || "");
  }, [query]);
  const [selectedMapset, setSelectedMapset] = useAtom(selectedMapsetAtom);

  const mapsets = rawMapsets.map((m) => ({
    ...m,
    id: m.id,
  }));

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      setQuery(value || undefined); // Remove param if input is empty
    },
    [setQuery]
  );

  const handleAddLayer = useCallback((mapset: Mapset) => {
    setSelectedMapset(mapset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredMapsets = mapsets.filter((mapset: Mapset) =>
    mapset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col h-full max-w-xl mx-auto bg-white rounded-l-lg shadow-lg">
      <div className="mb-4">
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Cari dataset"
        />
      </div>

      {filteredMapsets.length === 0 ? (
        <div className="flex h-[65vh] flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
          <Layers size={48} className="mb-2 opacity-50" />
          <p>No layers found matching &quot;{searchTerm}&quot;</p>
        </div>
      ) : (
        <div className="overflow-y-auto h-[65vh] pr-1">
          <DatasetSection />

          <div className="mb-10"></div>

          {filteredMapsets.map((mapset) => (
            <MapsetItem
              key={mapset.id}
              mapset={mapset}
              onClick={handleAddLayer}
              isSelected={mapset.id === selectedMapset?.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MapsetList;
