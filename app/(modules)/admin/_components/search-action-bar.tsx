import { Button } from "@/shared/components/ds/button";
import Link from "next/link";
import { CirclePlusIcon, ListFilter, UnlinkIcon, X } from "lucide-react";
import { SearchInput } from "./search-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Badge } from "@/shared/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface FilterOption {
  label: string;
  value: string;
  group: string;
  groupLabel: string;
}

interface SearchAndActionBarProps {
  searchValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonLabel: string;
  buttonLink: string;
  placeholder?: string;
  selectedCount?: number;
  onBulkAction?: () => void;
  bulkLabel?: string;
  showBulkAction?: boolean;
  filterOptions?: FilterOption[];
}

const SearchAndActionBar = ({
  searchValue,
  onChange,
  buttonLabel,
  buttonLink,
  placeholder = "Masukkan kata kunci",
  selectedCount = 0,
  onBulkAction,
  bulkLabel = "Nonaktifkan",
  showBulkAction = false,
  filterOptions = [],
}: SearchAndActionBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Initialize filters from URL params
  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam) {
      try {
        const filters = JSON.parse(filterParam);
        // Convert nested array format to flat array for internal state
        const flatFilters = Array.isArray(filters)
          ? filters.flatMap((f) => (Array.isArray(f) ? f : [f]))
          : [];
        setSelectedFilters(flatFilters);
      } catch {
        setSelectedFilters([]);
      }
    }
  }, [searchParams]);

  const handleFilterChange = (option: FilterOption) => {
    const filterValue = `${option.group}=${option.value}`;
    // If the filter is already selected, remove it
    if (selectedFilters.includes(filterValue)) {
      const newFilters = selectedFilters.filter((f) => f !== filterValue);
      setSelectedFilters(newFilters);
      updateUrlFilters(newFilters);
    } else {
      // If the filter is not selected, add it
      const newFilters = [...selectedFilters, filterValue];
      setSelectedFilters(newFilters);
      updateUrlFilters(newFilters);
    }
  };

  const removeFilter = (value: string) => {
    const newFilters = selectedFilters.filter((f) => f !== value);
    setSelectedFilters(newFilters);
    updateUrlFilters(newFilters);
  };

  const updateUrlFilters = (filters: string[]) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (filters.length > 0) {
      // Group filters by their group property
      const groupedFilters = filters.reduce((acc, filter) => {
        const [group] = filter.split("=");
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(filter);
        return acc;
      }, {} as Record<string, string[]>);

      // Convert grouped filters to array format
      const filterString = JSON.stringify(Object.values(groupedFilters));
      newParams.set("filter", filterString);
    } else {
      newParams.delete("filter");
    }

    router.push(`?${newParams.toString()}`);
  };

  // Group filter options by their group property
  const groupedOptions = filterOptions.reduce((acc, option) => {
    const group = option.group;
    if (!acc[group]) {
      acc[group] = {
        label: option.groupLabel,
        options: [],
      };
    }
    acc[group].options.push(option);
    return acc;
  }, {} as Record<string, { label: string; options: FilterOption[] }>);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <SearchInput
            placeholder={placeholder}
            value={searchValue}
            onChange={onChange}
            className="w-full max-w-sm"
          />
          {filterOptions.length > 0 && (
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button className="bg-white text-zinc-950 text-sm gap-3 border border-zinc-200 px-4 py-2">
                  <ListFilter className="w-4 h-4" />
                  Filter
                  {filterOptions.length > 0 && selectedFilters.length > 0 && (
                    <Badge className="ml-2">
                      {
                        selectedFilters.filter((filter) => {
                          const [key, value] = filter.split("=");
                          return filterOptions.some(
                            (opt) => opt.group === key && opt.value === value
                          );
                        }).length
                      }
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter</h4>

                  <div className="flex flex-col space-y-2 max-h-[300px] overflow-y-auto">
                    {Object.entries(groupedOptions).map(
                      ([group, { label, options }]) => (
                        <div key={group} className="space-y-2">
                          <h5 className="text-sm font-medium text-muted-foreground">
                            {label}
                          </h5>
                          <Select
                            onValueChange={(value) => {
                              const option = options.find(
                                (opt) => opt.value === value
                              );
                              if (option) handleFilterChange(option);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={`Select ${label}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {options.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showBulkAction && (
            <Button
              disabled={selectedCount === 0}
              onClick={onBulkAction}
              className="bg-white text-zinc-950 border border-zinc-200 border-dashed rounded-lg"
            >
              <UnlinkIcon className="h-4 w-4 mr-2 text-zinc-950" />
              <span className="text-zinc-950">{bulkLabel}</span>
            </Button>
          )}
          <Link href={buttonLink}>
            <Button size="sm">
              <CirclePlusIcon className="h-4 w-4 mr-2" />
              {buttonLabel}
            </Button>
          </Link>
        </div>
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters
            .filter((filter) => {
              const [key, value] = filter.split("=");
              return filterOptions.some(
                (opt) => opt.group === key && opt.value === value
              );
            })
            .map((filter) => {
              const [key, value] = filter.split("=");
              const option = filterOptions.find(
                (opt) => opt.group === key && opt.value === value
              );
              return (
                <Badge
                  key={filter}
                  className="flex items-center gap-1 px-3 py-1"
                >
                  {option?.label || filter}
                  <button
                    onClick={() => removeFilter(filter)}
                    className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SearchAndActionBar;
