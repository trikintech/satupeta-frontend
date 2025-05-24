import { Button } from "@/shared/components/ds/button";
import Link from "next/link";
import { CirclePlusIcon, UnlinkIcon } from "lucide-react";
import { SearchInput } from "./search-input";

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
}: SearchAndActionBarProps) => (
  <div className="flex items-center justify-between">
    <SearchInput
      placeholder={placeholder}
      value={searchValue}
      onChange={onChange}
      className="w-full max-w-sm"
    />

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
);

export default SearchAndActionBar;
