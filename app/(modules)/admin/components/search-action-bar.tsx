import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { SearchInput } from "./../components/search-input";

interface SearchAndActionBarProps {
  searchValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonLabel: string; // Label for the action button
  buttonLink: string; // Link for the action button
  placeholder?: string; // Placeholder for the search input
}

const SearchAndActionBar = ({
  searchValue,
  onChange,
  buttonLabel,
  buttonLink,
  placeholder = "Masukkan kata kunci", // Default placeholder
}: SearchAndActionBarProps) => (
  <div className="flex items-center justify-between">
    <SearchInput
      placeholder={placeholder}
      value={searchValue}
      onChange={onChange}
      className="w-full max-w-sm"
    />

    <div className="flex items-center gap-2">
      <Link href={buttonLink}>
        <Button size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          {buttonLabel}
        </Button>
      </Link>
    </div>
  </div>
);

export default SearchAndActionBar;
