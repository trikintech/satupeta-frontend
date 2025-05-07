import { Search } from "lucide-react";

interface SearchInputProps {
  onChange: (value: string) => void;
  placeholder?: string;
  value?: string;
}

export default function SearchInput({
  onChange,
  placeholder,
  value,
}: Readonly<SearchInputProps>) {
  return (
    <div className="relative text-zinc-600 text-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-sm">
        <Search size={16} className="text-muted-foreground" />
      </div>
      <input
        type="text"
        className="pl-10 py-2.5 px-3 border border-gray-300 rounded-lg w-full "
        placeholder={placeholder ?? "Search..."}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
}
