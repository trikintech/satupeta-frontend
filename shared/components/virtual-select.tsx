import { useMemo, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { Loader2, ChevronDownIcon } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface VirtualSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  height?: number;
  itemHeight?: number;
  maxVisible?: number;
}

export function VirtualSelect({
  options,
  value,
  onChange,
  placeholder = "Pilih opsi...",
  loading = false,
  itemHeight = 36,
  maxVisible = 6,
}: Readonly<VirtualSelectProps>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label || "";

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
    setQuery(""); // reset search on select
  };

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <span className="truncate text-left text-sm text-foreground">
          {selectedLabel || placeholder}
        </span>
        <ChevronDownIcon className="size-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-input bg-popover text-popover-foreground shadow-md">
          {/* Search Input */}
          <div className="sticky top-0 z-10 bg-popover p-2">
            <input
              type="text"
              autoFocus
              placeholder="Cari..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Options */}
          {loading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              Tidak ada hasil
            </div>
          ) : (
            <List
              height={Math.min(filteredOptions.length, maxVisible) * itemHeight}
              itemCount={filteredOptions.length}
              itemSize={itemHeight}
              width="100%"
            >
              {({ index, style }) => {
                const opt = filteredOptions[index];
                const isSelected = opt.value === value;
                return (
                  <div
                    key={opt.value}
                    style={style}
                    role="option"
                    className={`cursor-pointer px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                      isSelected
                        ? "bg-accent text-accent-foreground font-medium"
                        : ""
                    }`}
                    onClick={() => handleSelect(opt.value)}
                  >
                    {opt.label}
                  </div>
                );
              }}
            </List>
          )}
        </div>
      )}
    </div>
  );
}
