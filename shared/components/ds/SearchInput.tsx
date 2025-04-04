import { Search } from "lucide-react";

interface SearchInputProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  onChange,
  placeholder,
}: Readonly<SearchInputProps>) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={16} className="text-muted-foreground" />
      </div>
      <input
        type="text"
        className="bg-muted w-full pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder={placeholder ?? "Search..."}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
